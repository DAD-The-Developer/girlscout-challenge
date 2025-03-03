import { NextResponse } from 'next/server';
import { registerUser } from '../../../../services/auth';

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    
    // Register user
    const { user, token } = await registerUser({ name, email, password });
    
    // Set cookie with token
    const response = NextResponse.json(
      { success: true, user, token },
      { status: 201 }
    );
    
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
} 