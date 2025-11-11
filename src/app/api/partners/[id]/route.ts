  import { NextResponse } from "next/server";
  import { Partner } from "@/models/partner.model";
  import dbConnect from "@/lib/dbconnect";
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // 1. Import Kinde
  import { User } from "@/models/user.model"; // 2. Import User model

  export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } =  await params;

    try {
      await dbConnect();

      // --- Authentication ---
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const modelUser = await User.findOne({kindeId: user.id });
      if (!modelUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // --- End Auth ---

      // Find the partner by its ID *AND* check if it belongs to the logged-in user
      const partner = await Partner.findOne({
        _id: id,
        createdBy : modelUser.id
      });

      if (!partner) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(
        {
          success: true,
          data: partner,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong", error: error },
        { status: 500 }
      );
    }
  }

  // -------------------------------------------------------------------
  // 🚨 THIS IS THE NEW FUNCTION YOU NEED 🚨
  // -------------------------------------------------------------------
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
      await dbConnect();

      // --- Authentication ---
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const modelUser = await User.findOne({ kindeId: user.id });
      if (!modelUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // --- End Auth ---

      // 1. Get the update data from the frontend
      const body = await req.json();
      // body will be { relationshipType: 'Romantic', status: 'collecting_gender' }

      // 2. Find and update the partner
      const updatedPartner = await Partner.findOneAndUpdate(
        {
          _id: id,
          createdBy: modelUser._id, // 3. Security Check: Only update if they own it
        },
        {
          $set: body, // 4. Apply the updates from the body
        },
        {
          new: true, // 5. Return the *new*, updated document
        }
      );

      if (!updatedPartner) {
        console.log("wow")
        return NextResponse.json(
          { error: "Partner not found or access denied" },
          { status: 404 }
        );
      }

      // 6. Send the updated partner back to the frontend
      return NextResponse.json(
        {
          success: true,
          data: updatedPartner,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong", error: error },
        { status: 500 }
      );
    }
  }

  // -------------------------------------------------------------------
  // SECURED DELETE METHOD
  // -------------------------------------------------------------------
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await dbConnect();
      const { id } = params;

      // --- Authentication ---
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const modelUser = await User.findOne({ kindeId: user.id });
      if (!modelUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // --- End Auth ---

      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      // Find and delete by ID *AND* user ID
      const deletedPartner = await Partner.findOneAndDelete({
        _id: id,
        createdBy: modelUser._id, // 3. Security Check
      });

      if (!deletedPartner) {
        return NextResponse.json({ error: "Partner not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: deletedPartner,
      });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }