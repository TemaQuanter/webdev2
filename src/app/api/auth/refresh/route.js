/*
    This file contains the logic for handling refresh tokens in the application.
*/

import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req) {
  console.log('Refresh API triggered')

  // Retrieve the refresh token from cookies.
  const refreshToken = req.cookies.get('refreshToken')

  // Check if the refresh token is set.
  if (!refreshToken) {
    // The refresh token is not set.
    // Return an error.
    return NextResponse.json(
      { message: 'Refresh Token not found' },
      { status: 401 }
    )
  } // end if

  // TODO: Check if the token is used in the database.

  // Verify the validity of refresh token.
  try {
    // Try to decode the token and make sure that it has not expired yet.
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    // The token is not valid.
    // Redirect the user to log in page.
    const redirectUrl = new URL('/log_in', req.nextUrl.origin)

    return NextResponse.redirect(redirectUrl)
  } // end try-catch

  // Otherwise the refresh token is still valid.
  // Make new refresh and access tokens.
  const newRefreshToken = jwt.sign(
    { userId: decoded.userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  const newAccessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  // Stores the refresh token securely in cookies.
  req.cookies.set('refreshToken', newRefreshToken, {
    httpOnly: true, // Prevents client side from accessing the cookie.
    path: '/', // Makes the cookie accessible to all paths in the domain.
    sameSite: 'Strict', // Prevents CSRF attacks by not sending the cookie across requests from other websites.
    maxAge: 60 * 60 * 24 * 7 // 1 week (in seconds) until the cookie expires.
  })

  // Stores the access token securely in cookies.
  req.cookies.set('accessToken', newAccessToken, {
    httpOnly: true, // Prevents client side from accessing the cookie.
    path: '/', // Makes the cookie accessible to all paths in the domain.
    sameSite: 'Strict', // Prevents CSRF attacks by not sending the cookie across requests from other websites.
    maxAge: 60 * 60 // 1 hour (in seconds) until the cookie expires.
  })

  // Send a successful response.
  return NextResponse.json({}, { status: 200 })
} // end function POST
