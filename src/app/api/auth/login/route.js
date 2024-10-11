/*
    This file handles user login.
*/

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { INTERNAL_SERVER_ERROR, SALT_ROUNDS } from '@/constants'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export async function POST(req) {
  // Get the request data.
  const body = await req.json()

  // Get a hash from the password that was sent.
  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS)

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // A variable that stores the retrieved user from the database.
  let user

  // Try to retrieve the user with provided credentials.
  try {
    user = await prisma.users.findFirst({
      where: {
        email: body.email
      }
    })
  } catch (err) {
    // An error occurred when trying to fetch a user.

    // Log the error.
    console.log(err)

    // Return a general server error.
    return NextResponse.json(
      { message: INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  } finally {
    // Disconnect from the database.
    await prisma.$disconnect()
  } // end try-catch

  // Check if the user with such credentials exists.
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    // Return an error that says that the user with
    // such credentials was not found.
    return NextResponse.json(
      {
        message:
          'Either email or password or both are incorrect or the user does not exist.'
      },
      { status: 401 }
    )
  } // end if

  // Otherwise the user with such credentials was successfully
  // retrieved from the database.

  // Generate a refresh token for the user.
  const refreshToken = jwt.sign(
    { userId: user.user_id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // Success response.
  const response = NextResponse.json({}, { status: 200 })

  // Stores the refresh token securely in cookies.
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true, // Prevents client side from accessing the cookie.
    path: '/', // Makes the cookie accessible to all paths in the domain.
    sameSite: 'Strict', // Prevents CSRF attacks by not sending the cookie across requests from other websites.
    maxAge: 60 * 60 * 24 * 7 // 1 week (in seconds) until the cookie expires.
  })

  // TODO: Store the authentication token in the database.

  // The user logged in successfully.
  return response
} // end function POST
