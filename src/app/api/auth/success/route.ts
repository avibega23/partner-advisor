import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
// You probably don't need baseUrl anymore
// import { baseUrl } from "@/config/routes"; 
import dbConnect from "@/lib/dbconnect";

// 1. Add 'request: Request' as the argument
export async function GET(request: Request) { 
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    
    // 2. Create a URL object from the incoming request
    const requestUrl = new URL(request.url);

    const dbUser = await User.findOne({ kindeId: user.id });

    if (!dbUser) {
      await User.create({
        name: user.username,
        email: user.email,
        kindeId: user.id,
      });

      // 3. Build the new URL using the request's origin
      const redirectUrl = new URL("/profileintroduce", requestUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    // 4. Build the final chat URL using the request's origin
    const chatUrl = new URL("/chat", requestUrl.origin);
    return NextResponse.redirect(chatUrl);

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}