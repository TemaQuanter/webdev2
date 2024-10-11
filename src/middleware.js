import { NextResponse } from 'next/server'

export function middleware(req) {
  const accessToken = req.cookies.get('accessToken')
  const refreshToken = req.cookies.get('refreshToken')

  console.log('Access token in middleware:', accessToken)
  console.log('Refresh token in middleware:', refreshToken)

  // If both accessToken and refreshToken are missing, redirect to sign_in
  if (!accessToken && !refreshToken) {
    console.log('No tokens found, redirecting to sign-in...')
    return NextResponse.redirect(new URL('/sign_in', req.nextUrl.origin))
  }

  // If accessToken is missing but refreshToken exists, try refreshing tokens
  if (!accessToken && refreshToken) {
    console.log('Access token missing, attempting to refresh...')
    const refreshUrl = new URL('/refresh', req.nextUrl.origin)
    refreshUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(refreshUrl)
  }

  // If accessToken exists, proceed to the protected page
  console.log('Access token found, proceeding to next middleware...')
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/account']
}
