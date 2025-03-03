import { NextResponse } from 'next/server';

// This middleware runs on app startup and for each request
export async function middleware(request) {
  // We'll handle database connection in the API routes instead of middleware
  // This is more compatible with Edge Runtime
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths this middleware is run for
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 