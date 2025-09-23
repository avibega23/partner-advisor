import dbConnect from "@/lib/dbconnect";
import { Partner } from "@/models/partner.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request : NextRequest) {


    try {

        await dbConnect();

        const reqBody = await request.json();

        console.log("request body: ", reqBody);

        if (!reqBody || Object.keys(reqBody).length === 0) {

            return NextResponse.json({message : "bad request, no data provided"}, {status : 400});
        }

        const newPartner = await Partner.create(reqBody);

        return NextResponse.json({message : "new partner created successfully", partner : newPartner}, {status : 201});

        
    } catch (error) {

        console.log("error while creating new partner: ",error);

        return NextResponse.json({message : "internal server error"}, {status : 500});
        
    }


}