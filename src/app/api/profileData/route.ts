import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect'; 
import { User } from '../../../models/user.model'; 
import { authOption } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOption);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

   const { personality } = await request.json();

    if (!personality) {
      return NextResponse.json({ success: false, error: 'Personality data is required.' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          personality: personality 
        }
      },
      {
        new: true, 
      }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('USERUPDATION::ERROR:: !!!', error);

    return NextResponse.json({success : false, error : error});
  }
}

