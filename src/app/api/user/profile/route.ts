import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import { User } from '@/models/user.model';
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";


export async function GET(request: Request) {
  try {
    await dbConnect();

    // 1. Authenticate the user
    const session = await getServerSession(authOption);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. Find the user by their ID
    const user = await User.findById(userId).select('-hashedPassword'); // Don't send password
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });

  } catch (error) {
    console.error('GET_USER_PROFILE::ERROR:: !!!', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

/**
 * @route PUT /api/user/profile
 * @desc Update the current user's personality profile
 * @access Private
 */
export async function PUT(request: Request) {
  try {
    await dbConnect();

    // 1. Authenticate the user
    const session = await getServerSession(authOption);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. Securely get *only* the personality data
    const { personality } = await request.json();

    if (!personality) {
      return NextResponse.json({ success: false, error: 'Personality data is required.' }, { status: 400 });
    }

    // 3. Find the user and update *only* their personality
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          personality: personality 
        }
      },
      { new: true, runValidators: true }
    ).select('-hashedPassword');

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('UPDATE_USER_PROFILE::ERROR:: !!!', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}