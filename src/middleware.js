/*
    This middleware verifies user authentication while they are using some
    features, available only to authenticated users.
*/

import { NextResponse } from 'next/server'

export function middleware(req) {
  // Get an access token.
  const accessToken = req.cookies.get('accessToken')

  console.log('Access token in middleware:', accessToken)

  // Check if the access token is set.
  if (!accessToken) {
    // Access token is not set.
    // Redirect the request to a token refresh api.
    const refreshUrl = new URL('/refresh', req.nextUrl.origin)

    // Save the original request url.
    refreshUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    console.log(
      'Middleware set redirectTo to',
      refreshUrl.searchParams.get('redirectTo')
    )

    // Redirect the client to refresh api.
    return NextResponse.redirect(refreshUrl)
  } // end if

  // Otherwise, all checks passed successfully.
  return NextResponse.next()
} // end function middleware

export const config = {
  matcher: ['/account/:path*', '/account']
} // end config
