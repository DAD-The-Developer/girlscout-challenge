import { verifyToken } from '../services/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Middleware to protect API routes
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withAuth(handler) {
  return async (req, context) => {
    try {
      // Get token from Authorization header or cookies
      let token;
      
      // Check Authorization header
      const authHeader = req.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
      
      // If no token in header, check cookies
      if (!token) {
        const cookieStore = await cookies();
        const tokenCookie = await cookieStore.get('token');
        token = tokenCookie?.value;
      }
      
      if (!token) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Verify token
      const decoded = verifyToken(token);
      
      // Add user ID to request
      req.userId = decoded.id;
      
      // Call the original handler
      return handler(req, context);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error.message || 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

/**
 * Client-side authentication check
 * @returns {Object|null} User object or null if not authenticated
 */
export async function getAuthUser() {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

/**
 * Redirect if not authenticated (client-side)
 * @param {string} redirectTo - Path to redirect to if not authenticated
 * @returns {Promise<boolean>} Whether the user is authenticated
 */
export async function requireAuth(redirectTo = '/login') {
  const user = await getAuthUser();
  
  if (!user) {
    window.location.href = redirectTo;
    return false;
  }
  
  return true;
} 