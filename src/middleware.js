import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req) {
  let accessToken = req.cookies.get('accessToken')
  let refreshToken = req.cookies.get('refreshToken')

  console.log('Access token in middleware:', accessToken)
  console.log('Refresh token in middleware:', refreshToken)

  // Verify token validity.

  // If access token exists, verify that it is still valid.
  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken.value,
        process.env.ACCESS_TOKEN_SECRET
      )
    } catch (err) {
      // Token is invalid.
      accessToken = null
    } // end try-catch
  } // end if

  // If refresh token exists, verify that it is still valid.
  if (refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken.value,
        process.env.REFRESH_TOKEN_SECRET
      )
    } catch (err) {
      console.log(err)
      // Token is invalid.
      refreshToken = null
    } // end try-catch
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
  matcher: ['/account/:path*', '/account']
} // end config
