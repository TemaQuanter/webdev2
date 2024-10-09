/*
    This middleware verifies user authentication while they are using some
    features, available only to authenticated users.
*/

import { NextResponse } from 'next/server'

export function middleware(req) {
  // Get an access token.
  const accessToken = req.cookies.get('accessToken')

  // Check if the access token is set.
  if (!accessToken) {
    // Access token is not set.
    // Redirect the request to a token refresh api.
    const refreshUrl = new URL('/api/refresh', req.nextUrl.origin)
    console.log(refreshUrl.pathname)
  }
} // end function middleware

export const config = {
  matcher: ['/account/:path*', '/account']
} // end config
