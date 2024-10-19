import { NextResponse } from 'next/server'
import {
  TYPE_ACCESS_TOKEN,
  TYPE_REFRESH_TOKEN,
  verifyJWT
} from './utils/jwt_manager'

export async function middleware(req) {
  let accessToken = req.cookies.get('accessToken')
  let refreshToken = req.cookies.get('refreshToken')

  console.log('Access token in middleware:', accessToken)
  console.log('Refresh token in middleware:', refreshToken)

  // Verify token validity.

  // If access token exists, verify its validity.
  if (accessToken) {
    accessToken = await verifyJWT(TYPE_ACCESS_TOKEN, accessToken.value)
  } // end if

  // If refresh token exists, verify its validity.
  if (refreshToken) {
    refreshToken = await verifyJWT(TYPE_REFRESH_TOKEN, refreshToken.value)
  } // end if

  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)

  // If both accessToken and refreshToken are missing, redirect to sign_in
  if (!accessToken && !refreshToken) {
    console.log('No tokens found, redirecting to sign-in...')
    return NextResponse.redirect(new URL('/sign_in', req.nextUrl.origin))
  } // end if

  // If accessToken is missing but refreshToken exists, try refreshing tokens
  if (!accessToken && refreshToken) {
    console.log('Access token missing, attempting to refresh...')
    const refreshUrl = new URL('/refresh', req.nextUrl.origin)
    refreshUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(refreshUrl)
  } // end if

  // If accessToken exists, proceed to the protected page
  console.log('Access token found, proceeding to next middleware...')
  return NextResponse.next()
} // end function middleware

export const config = {
  matcher: ['/account/:path*', '/account', '/api/db/add_to_cart']
} // end config
