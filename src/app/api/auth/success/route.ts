import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { baseUrl } from "@/config/routes";
import dbConnect from "@/lib/dbconnect";



export async function GET() {


    try {

        await dbConnect();

        const {getUser} = getKindeServerSession();

        const user = await getUser();

        if (!user || !user.id) {
            NextResponse.json({message : "user not found"}, {status : 404});
            return;
        }

        const dbUser = await User.findOne({kindeId : user.id});

        if (!dbUser) {

            await User.create({
                name : user.username,
                email : user.email,
                kindeId : user.id,
                
            })
          
        }


        return NextResponse.redirect(`${baseUrl}`);

        

    } catch (error) {
        console.log(error);
        
    }



}