import { NextResponse } from 'next/server';
import { getUserById } from '../../../../services/auth';
import { withAuth } from '../../../../utils/authMiddleware';

// Specify Node.js runtime
export const runtime = 'nodejs';

async function handler(req) {
  try {
    // Get user ID from request (added by withAuth middleware)
    const userId = req.userId;
    
    // Get user data
    const user = await getUserById(userId);
    
    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get user data' },
      { status: 400 }
    );
  }
}

export const GET = withAuth(handler); 