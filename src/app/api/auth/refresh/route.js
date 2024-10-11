import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const refreshToken = req.cookies.get('refreshToken')

  // Log incoming cookies
  console.log('Cookies in refresh request:', req.cookies)
  console.log('Refresh token in refresh request:', refreshToken)

  if (!refreshToken) {
    console.log('No refresh token found in cookies.')
    return NextResponse.json(
      { message: 'Refresh Token not found' },
      { status: 401 }
    )
  }

  let decoded

  try {
    decoded = jwt.verify(refreshToken.value, process.env.REFRESH_TOKEN_SECRET)
    console.log('Decoded refresh token:', decoded)
  } catch (err) {
    console.log('Invalid refresh token:', err)
    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 401 }
    )
  }

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

  console.log('Successfully generated new refresh and access tokens.')

  const response = NextResponse.json({}, { status: 200 })
  response.cookies.set('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 // 1 hour
  })

  return response
}
