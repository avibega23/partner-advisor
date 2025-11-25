import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import { Partner } from "@/models/partner.model";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

//Partner creation
export async function POST(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOption);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const clientData = await request.json();

    const colorClasses = [
      "bg-random-1",
      "bg-random-2",
      "bg-random-3",
      "bg-random-4",
      "bg-random-5",
      "bg-random-6",
      "bg-random-7",
      "bg-random-8",
      "bg-random-9",
    ];

    const getRandomColor = () => {
      return colorClasses[Math.floor(Math.random() * colorClasses.length)];
    };

    const newPartnerData = {
      name: clientData.name,
      profileColor:getRandomColor(),
      createdBy: user._id,
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

//partner fetch return all partners
export async function GET() {
  try {
    await dbConnect();


    const session = await getServerSession(authOption);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const partners = await Partner.find({ createdBy: user._id });

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