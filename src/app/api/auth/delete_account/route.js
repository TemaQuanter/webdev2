/*
    This file contains a logic for account removal.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { promises as fs } from 'fs'
import path from 'path'

export const DELETE = async (req) => {
  console.log('delete_account api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Try to decrypt and verify the access token.
  const decoded = await verifyJWT(TYPE_ACCESS_TOKEN, accessToken.value)

  // Display the decoded access token.
  console.log(decoded)

  // Check if the access token is valid.
  if (decoded === null) {
    // The decoded token is invalid.
    // Send a not authorized response to the client.
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  } // end try-catch

  // Get the user ID from the token.
  const userId = decoded.userId

  // Get the user data that is required for account removal.
  const data = await req.json()

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to delete the user account.
  try {
    // Delete the user data.
    await prisma.$transaction(async (prisma) => {
      // Get the user data from the database for verification before
      // account removal.
      const user = await prisma.users.findUnique({
        where: {
          user_id: userId
        },
        select: {
          password: true,
          profile_picture_url: true
        }
      })

      console.log(user)

      // Verify user password.
      if (
        !data.password ||
        !user ||
        !(await bcrypt.compare(data.password, user.password))
      ) {
        // The user is not authorized to delete the account.
        throw new Error('Unauthorized')
      } // end if

      // Remove user profile picture, if exists.
      if (user.profile_picture_url) {
        try {
          await fs.unlink(path.join(process.cwd(), user.profile_picture_url))
        } catch (err) {
          // Log the error.
          console.log(err)

          // Failed to remove the profile picture.
          throw new Error('Failed to remove a profile picture')
        } // end try-catch
      } // end if

      // Softly remove the user from the database.
      await prisma.$executeRaw`CALL soft_delete_user(${userId}::INT)`
    }) // end transaction

    console.log('The user was successfully deleted via soft method.')
  } catch (err) {
    // Log the error.
    console.log(err)

    // Check the error message.
    if (err.message == 'Unauthorized') {
      // The user is not authorized to delete the account.
      return NextResponse.json(
        { message: 'Incorrect password or unauthorized' },
        { status: 401 }
      )
    } // end if

    // Return a general server error.
    return NextResponse.json(
      { message: INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  } finally {
    // Disconnect from the database.
    await prisma.$disconnect()
  } // end try-catch

  // Generate a response with zeroed cookies.
  const response = NextResponse.json({}, { status: 200 })

  // Delete access and refresh tokens for the deleted user.
  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set to secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 0 // Delete the cookie straightaway.
  })

  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set to secure in production
    path: '/',
    sameSite: 'Strict',
    maxAge: 0 // Delete the cookie straightaway.
  })

  // Return the successful response.
  return response
} // end function DELETE
