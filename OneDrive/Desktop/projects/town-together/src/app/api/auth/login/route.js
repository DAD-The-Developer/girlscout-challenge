import { NextResponse } from 'next/server';
import { loginUser } from '../../../../services/auth';

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Login user
    const { user, token } = await loginUser(email, password);
    
    // Set cookie with token
    const response = NextResponse.json(
      { success: true, user, token },
      { status: 200 }
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
      { success: false, message: error.message || 'Login failed' },
      { status: 401 }
    );
  }
} 