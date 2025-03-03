import { NextResponse } from 'next/server';

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function POST() {
  // Create response
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );
  
  // Clear token cookie
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  });
  
  return response;
} 