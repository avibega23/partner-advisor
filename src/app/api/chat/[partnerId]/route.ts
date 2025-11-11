import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import { Message } from "@/models/message.model";
import { User } from '@/models/user.model';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Partner } from "@/models/partner.model";
import { GoogleGenAI } from "@google/genai";

export async function GET(request: Request, { params }: { params: { partnerId: string } }) {
    try {
        await dbConnect();
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const modelUser = await User.findOne({ kindeId: user.id });

        const messages = await Message.find({
            partnerId: params.partnerId,
            userId: modelUser._id,
        }).sort({ createdAt: 'asc' });

        return NextResponse.json({ success: true, data: messages }, { status: 200 });

    } catch (error) {
        console.log(`MESSAGE-FETCHING::ERRROR :: !!! `, error)


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


export async function POST(request: Request, { params }: { params: { partnerId: string } }) {
    try {
        await dbConnect();
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        };

        const modelUser = await User.findOne({ kindeId: user.id });

        const { message } = await request.json();
        if (!message) {
            return NextResponse.json({ success: false, message: "Empty Message" }, { status: 400 });
        }

        await Message.create({
            content: message,
            role: "user",
            userId: modelUser._id,
            partnerId: params.partnerId,
        });

        const partner = await Partner.findById(params.partnerId);

        const chatHistory = await Message.find({ partnerId: params.partnerId, userId: modelUser._id });

        const prompt = `
            You are a Partner Advisor.
            The user's profile: ${JSON.stringify(modelUser.personality)}
            The partner's profile: ${JSON.stringify(partner)}
            
            Here is the chat history (user and model roles):
            ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
            
            User's new message: ${message}
            
            Your response:
            `;

        const ai = new GoogleGenAI({});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });


        // 6. Save the AI's response to the DB
        const aiMessage = await Message.create({
            content: response.text,
            role: 'model',
            userId: modelUser._id,
            partnerId: params.partnerId,
        });

        // 7. Send the *new* AI message back to the front end
        return NextResponse.json({ success: true, data: aiMessage }, { status: 201 });

    } catch (error) {
        console.log(`MESSAGE-POSTING::ERRROR :: !!! `, error)


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