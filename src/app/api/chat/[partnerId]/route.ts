import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import { Message } from "@/models/message.model";
import { User } from '@/models/user.model';
import { Partner } from "@/models/partner.model";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOption } from "./../../auth/[...nextauth]/route";
import path from "path";
import { promises as fs } from "fs";


//sends all the messages of partner chat
export async function GET(request: Request, { params }: { params: { partnerId: string } }) {
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

        const messages = await Message.find({
            partnerId: params.partnerId,
            userId: user._id,
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

//posts new message
export async function POST(request: Request, { params }: { params: { partnerId: string } }) {
    await dbConnect();
    const filePath = path.join(process.cwd(), "public/data/products.json");
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    const session = await getServerSession(authOption);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.id) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {

        const { message } = await request.json();
        if (!message) {
            return NextResponse.json({ success: false, message: "Empty Message" }, { status: 400 });
        }

        await Message.create({
            content: message,
            role: "user",
            userId: user._id,
            partnerId: params.partnerId,
        });

        const partner = await Partner.findById(params.partnerId);

        const chatHistory = await Message.find({ partnerId: params.partnerId, userId: user._id });

        const prompt = `
            You are a Partner Advisor.
            You task is to resolve concerns about partners
            Partner can be crush or wife/husband or friend anything..
            Your'e task is to understand the body language of the user and help him/her solve his/her concerns right
            You will get the user data and partner's profile data
            First u have to ask some question mentioned below named as DATA to understand more about them..
            
            The user's profile: ${JSON.stringify(user.personality)}
            The partner's profile: ${JSON.stringify(partner)}
            
            Here is the chat history (user and model roles):
            ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
            Data : ${data}

            The given data above is the questions that the users have to answer about their partner untill and unless user should not talk about their partner concerns.

            If the All Questions are asked act like a professional AI and talk to him/her about her/his partner's concerns and solve that

            User's new message: ${message}
            
            Your response:
            `;

        const ai = new GoogleGenAI({});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });


        const aiMessage = await Message.create({
            content: response.text,
            role: 'model',
            userId: user._id,
            partnerId: params.partnerId,
        });


        return NextResponse.json({ success: true, data: aiMessage }, { status: 201 });

    } catch (e) {
        const aiMessage = await Message.create({
            content: "Sorry I can't talk right now! Please try again",
            role: 'model',
            userId: user._id,
            partnerId: params.partnerId,
        });


        return NextResponse.json({ success: true, data: aiMessage }, { status: 201 });
    }
}