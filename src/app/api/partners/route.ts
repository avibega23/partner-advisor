import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import { Partner } from "@/models/partner.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@/models/user.model";


export async function POST(request: Request) {
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const modelUser = await User.findOne({ kindeId: user.id });

    if (!modelUser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    const clientData = await request.json();


    const newPartnerData = {
      ...clientData,
      createdBy: modelUser._id, 
      status: "new", 
    };

    const partner = await Partner.create(newPartnerData);

    return NextResponse.json({
      success: true,
      data: partner,
    },
      {
        status: 201
      }
    )
  } catch (error: unknown) {
    console.log(`PARTNER-CREATION::ERRROR :: !!! `, error)

    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({
      success: false,
      error: message || "Something went wrong"
    },
      {
        status: 500
      }
    )
  }
}

export async function GET() {
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const modelUser = await User.findOne({ kindeId: user.id })
    console.log(modelUser)
    const partners = await Partner.find({ createdBy: modelUser._id });

    return NextResponse.json(
      { success: true, data: partners },
      { status: 200 }
    );


  } catch (error) {
    console.log(`PARTNERS-FETCHING::ERRROR :: !!! `, error)


    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({
      success: false,
      error: message || "Something went wrong"
    },
      {
        status: 500
      }
    )
  }
}