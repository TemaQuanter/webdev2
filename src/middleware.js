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
    const refreshUrl = new URL('/refresh', req.nextUrl.origin)

    console.log(req.nextUrl)

    // Save the original request url.
    refreshUrl.searchParams.set('redirectTo', req.nextUrl.pathname)

    // Redirect the client to refresh api.
    return NextResponse.redirect(refreshUrl)
  } // end if

  // Otherwise, all checks passed successfully.
  return NextResponse.next()
} // end function middleware

export const config = {
  matcher: ['/account/:path*', '/account']
} // end config
