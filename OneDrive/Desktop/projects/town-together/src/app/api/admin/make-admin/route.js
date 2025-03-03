import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../utils/mongodb';
import User from '../../../../models/User';

// Specify Node.js runtime
export const runtime = 'nodejs';

// This endpoint is for initial setup only and should be secured or removed in production
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, secretKey } = body;
    
    // Verify the secret key (this is a simple security measure)
    const expectedSecretKey = process.env.ADMIN_SECRET_KEY || 'town-together-admin-setup';
    
    if (secretKey !== expectedSecretKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid secret key' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user role to admin
    user.role = 'admin';
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: `User ${email} has been made an admin`,
    });
  } catch (error) {
    console.error('Make admin error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to make user an admin' },
      { status: 500 }
    );
  }
} 