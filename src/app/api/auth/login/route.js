import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import {
  createJWT,
  TYPE_ACCESS_TOKEN,
  TYPE_REFRESH_TOKEN
} from '@/utils/jwt_manager'

export async function POST(req) {
  const body = await req.json()
  const prisma = new PrismaClient()
  let user

  try {
    user = await prisma.users.findFirst({
      where: { email: body.email }
    })
  } catch (err) {
    console.log('Database error:', err)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }

  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    console.log('Invalid credentials for user:', body.email)
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const accessToken = await createJWT(TYPE_ACCESS_TOKEN, user.user_id)
  const refreshToken = await createJWT(TYPE_REFRESH_TOKEN, user.user_id)

  console.log('Login successful, issuing new refresh and access tokens.')

  const response = NextResponse.json({}, { status: 200 })

  // Set refresh and access tokens
  console.log('Setting refresh token in cookies:', refreshToken)
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set to secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  console.log('Setting access token in cookies:', accessToken)
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 // 1 hour
  })

  return response
}
