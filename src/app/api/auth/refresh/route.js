import {
  createJWT,
  TYPE_ACCESS_TOKEN,
  TYPE_REFRESH_TOKEN,
  verifyJWT
} from '@/utils/jwt_manager'
import { NextResponse } from 'next/server'

export async function POST(req) {
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

  // Generate new refresh and access tokens that will be issued to the user.
  const newRefreshToken = await createJWT(TYPE_REFRESH_TOKEN, decoded.userId)
  const newAccessToken = await createJWT(TYPE_ACCESS_TOKEN, decoded.userId)

  console.log('Successfully generated new refresh and access tokens.')

  // Store the refresh token in the cookies.
  const response = NextResponse.json({}, { status: 200 })
  response.cookies.set('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  // Store the access token in the cookies.
  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 // 1 hour
  })

  return response
} // end function POST
