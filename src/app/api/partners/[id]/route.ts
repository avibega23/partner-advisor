import { NextRequest, NextResponse } from "next/server";
import { Partner } from "@/models/partner.model";
import dbConnect from "@/lib/dbconnect";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await dbConnect()

        const partner = await Partner.findById(id);

        if (!partner) {
            return NextResponse.json({
                error: "Not found"
            },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json({
            success: true,
            data: partner,
        },
            {
                status: 200
            })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error: error }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletedPartner = await Partner.findByIdAndDelete(id);

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
