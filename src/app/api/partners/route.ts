import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import { Partner } from "@/models/partner.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(request: Request) {
  try {
    await dbConnect();

    const data = await request.json();

    const partner = await Partner.create(data);

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

    // 2️⃣ Use logged-in user's id directly
    const partners = await Partner.find({ createdBy: user.id });

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