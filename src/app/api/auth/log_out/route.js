import {
  createJWT,
  TYPE_ACCESS_TOKEN,
  TYPE_REFRESH_TOKEN,
  verifyJWT
} from '@/utils/jwt_manager'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  // Try to extract a refresh token from the cookies.
  const refreshToken = req.cookies.get('refreshToken')

  // Log incoming cookies
  console.log('Cookies in refresh request:', req.cookies)
  console.log('Refresh token in refresh request:', refreshToken)

  // Check if the refresh token exists. If not, then it is impossible to refresh it.
  if (!refreshToken) {
    console.log('No refresh token found in cookies.')
    return NextResponse.json(
      { message: 'Refresh Token not found' },
      { status: 401 }
    )
  } // end if

  // Decode and verify the refresh token.
  const decoded = await verifyJWT(TYPE_REFRESH_TOKEN, refreshToken.value)
  console.log('Decoded refresh token:', decoded)

  // If the decoded token is null, that means, that the token is invalid.
  if (decoded === null) {
    console.log('Invalid refresh token:', err)
    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 401 }
    )
  } // end if

  // Generate a response with cookies.
  const response = NextResponse.json({}, { status: 200 })

  // Set the refresh token in the cookies to none and delete it.
  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 0 // Remove the token instantly
  })

  // Set the access token in the cookies to none and delete it.
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 0 // Remove the token instantly
  })

  return response
} // end function POST
