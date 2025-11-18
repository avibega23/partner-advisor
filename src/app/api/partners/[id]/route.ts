import { NextResponse } from "next/server";
import { Partner } from "@/models/partner.model";
import dbConnect from "@/lib/dbconnect"; // 1. Import Kinde
import { User } from "@/models/user.model"; // 2. Import User model

//get partner 
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    await dbConnect();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const modelUser = await User.findOne({ kindeId: user.id });
    if (!modelUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const partner = await Partner.findOne({
      _id: id,
      createdBy: modelUser.id
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

//update partner route
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    await dbConnect();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const modelUser = await User.findOne({ kindeId: user.id });
    if (!modelUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Get the update data from the frontend
    const body = await req.json();
    // body will be { relationshipType: 'Romantic', status: 'collecting_gender' }

    // 2. Find and update the partner
    const updatedPartner = await Partner.findOneAndUpdate(
      {
        _id: id,
        createdBy: modelUser._id, 
      },
      {
        $set: body, 
      },
      {
        new: true, 
      }
    );

    if (!updatedPartner) {
      return NextResponse.json(
        { error: "Partner not found or access denied" },
        { status: 404 }
      );
    }

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


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;


    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const modelUser = await User.findOne({ kindeId: user.id });
    if (!modelUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

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