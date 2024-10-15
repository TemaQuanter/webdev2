/*
    This file contains a logic for updating
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { promises as fs } from 'fs'
import path from 'path'

const PROFILE_PICTURES_PATH = 'protected_images/profile_pictures'

export const POST = async (req) => {
  console.log('update_account_data api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Retrieve the data passed with the request.
  const formData = await req.formData()

  console.log(formData)

  // Profile picture file.
  let profilePictureFile
  let filePath = null

  // The buffer to store the profile picture in.
  let buffer

  console.log(formData)

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

  // Verify the user credentials.

  // Make sure that the name is set properly.
  if (formData.get('firstName').length < 1) {
    // The name is invalid.
    return NextResponse.json(
      {
        message: 'User name must be at least 1 character long.'
      },
      { status: 400 }
    )
  } // end if

  // Make sure that the last name is set properly.
  if (formData.get('lastName').length < 1) {
    // The last name is invalid.
    return NextResponse.json(
      {
        message: 'User last name must be at least 1 character long.'
      },
      { status: 400 }
    )
  } // end if

  // If the image was provided, get the file data.
  if (formData.get('profilePicture')) {
    // Get a file.
    profilePictureFile = formData.get('profilePicture')

    // Convert file data to a buffer.
    buffer = Buffer.from(await profilePictureFile.arrayBuffer())

    // Get a file extension.
    const fileExtension = path.extname(profilePictureFile.name)

    // Generate a filepath.
    filePath = path.join(
      process.cwd(),
      PROFILE_PICTURES_PATH,
      `${userId.toString()}${fileExtension}`
    )

    console.log(filePath)

    // Save the profile picture to the required path.
    try {
      // Write the file to the file system.
      await fs.writeFile(filePath, buffer)
      console.log(`File saved at: ${filePath}`)
    } catch (error) {
      // An error occurred while saving a file.
      console.error('Error writing file:', error)
    } // end try-catch
  } // end if

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to update the user data.
  try {
    // Update the user.
    const updatedUser = await prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        ...(filePath && { profile_picture_url: filePath }) // Conditionally include profile_picture_url only if filePath exists
      }
    })

    // Log the updated user.
    console.log('Updated user:', updatedUser)
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

  // Return the successful response.
  return NextResponse.json({}, { status: 200 })
} // end function POST
