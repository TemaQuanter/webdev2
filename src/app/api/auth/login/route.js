/*
    This is a login endpoint that authorizes a user in the application.
*/

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import {
  createJWT,
  TYPE_ACCESS_TOKEN,
  TYPE_REFRESH_TOKEN
} from '@/utils/jwt_manager'

export const POST = async (req) => {
  // Get the data sent with the request.
  const body = await req.json()

  // Establish a database connection.
  const prisma = new PrismaClient()

  // A user that is retrieved from the database.
  let user

  // Try to retrieve the user from the database.
  try {
    user = await prisma.users.findFirst({
      where: { email: body.email }
    })
  } catch (err) {
    // An error occurred while retrieving a user from the database.
    console.log('Database error:', err)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    // Disconnect from the database.
    await prisma.$disconnect()
  } // end try-catch

  // Check if the user password and the password in the database match.
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    console.log('Invalid credentials for user:', body.email)
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  } // end if

  // Generate both access and refresh tokens.
  const accessToken = await createJWT(TYPE_ACCESS_TOKEN, user.user_id)
  const refreshToken = await createJWT(TYPE_REFRESH_TOKEN, user.user_id)

  console.log('Login successful, issuing new refresh and access tokens.')

  // Generate a response with secured cookies.
  const response = NextResponse.json({}, { status: 200 })

  // Set refresh and access tokens in the cookies.
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

  // Return a successful response with both access and refresh tokens attached.
  return response
} // end function POST
