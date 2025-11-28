import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";


export async function POST(request : Request) {
    try {
        const {prompt} = await request.json();
        const ai = new GoogleGenAI({});
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        if(!response)
        {
            return NextResponse.json({sucess:false, response : "Not found"},{status:401})
        }
        return NextResponse.json({ sucess: true, data : response.text }, { status: 200 })
    } catch (error) {
       return NextResponse.json({ success: false, response: error }, { status: 500 });
    }
}