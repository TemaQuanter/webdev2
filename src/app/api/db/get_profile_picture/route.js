/*
    This file contains a logic for retrieving all
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const GET = async (req) => {
  console.log('get_account_data api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Data that will be retrieved from the database.
  let user
  let profilePicture

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

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required user data from the database.
    user = await prisma.users.findUnique({
      where: {
        user_id: userId
      },
      select: {
        profile_picture_url: true
      }
    })

    console.log(user)
  } catch (err) {
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

  // If the user does not exist, then return
  // the default profile picture.
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  } // end if

  // Construct the image path.
  const imagePath =
    user.profile_picture_url ||
    path.join(process.cwd(), 'public/images/default_profile.png')

  console.log(imagePath)

  try {
    // Read the image file from the file system.
    const imageBuffer = await fs.readFile(imagePath)

    // Determine the correct content type.
    const contentType = `image/${path
      .extname(imagePath)
      .slice(1)
      .toLowerCase()}`

    // Return the image as a binary response.
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline; filename="profile_picture.jpg"' // Optional
      }
    })
  } catch (err) {
    // An error occurred while reading the file.
    console.log(err)
    return NextResponse.json(
      { message: 'Error reading profile picture' },
      { status: 500 }
    )
  }

  // Return the user.
  return NextResponse.json(user, { status: 200 })
} // end function GET
