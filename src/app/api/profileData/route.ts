import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect'; // Adjust the path based on your folder structure
import { User } from '../../../models/user.model'; // Adjust the path to your User model

export async function POST(request: Request) {
  try {
    await dbConnect();

    const data = await request.json();

    // You could add validation here before creating the user
    if (!data.email) {
        return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate({email : data.email},{
      ...data
    });
    await user.save();

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('USERCREATION::ERROR:: !!!', error);

    // We now check the type of 'error' before using its properties.
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ success: false, error: 'A user with this email or Kinde ID already exists.' }, { status: 409 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: 'Server Error: ' + error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: false, error: 'An unknown server error occurred.' }, { status: 500 });
  }
}

