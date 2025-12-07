import { NextResponse } from "next/server";
import { Partner } from "@/models/partner.model";
import dbConnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { User } from "@/models/user.model";

//get partner

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    try {
        await dbConnect();

        const session = await getServerSession(authOption);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const partner = await Partner.findOne({
            _id: id,
            createdBy: user.id,
        });

        if (!partner) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                data: partner,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong", error: error },
            { status: 500 },
        );
    }
}

//update partner route
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    try {
        await dbConnect();

        const session = await getServerSession(authOption);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const body = await request.json();

        const updatedPartner = await Partner.findOneAndUpdate(
            {
                _id: id,
                createdBy: user._id,
            },
            {
                $set: body,
            },
            {
                new: true,
            },
        );

        if (!updatedPartner) {
            return NextResponse.json(
                { error: "Partner not found or access denied" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: updatedPartner,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong", error: error },
            { status: 500 },
        );
    }
}

