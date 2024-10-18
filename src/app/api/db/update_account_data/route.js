/*
    This file contains a logic for updating
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR, PROFILE_PICTURES_PATH } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { promises as fs } from 'fs'
import path from 'path'

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
  let fileExtension

  // The buffer to store the profile picture in.
  let buffer

  // Previous user state.
  let previousUserState

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

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // If the image was provided, get the file data.
  if (formData.get('profilePicture') instanceof File) {
    // Remove the previous profile picture of the user from the database.

    // Retrieve the path of the previous profile picture from the database.
    try {
      previousUserState = await prisma.users.findUnique({
        where: {
          user_id: userId
        },
        select: {
          user_uuid: true,
          profile_picture_url: true
        }
      })

      // If the file exists, remove it.
      if (previousUserState.profile_picture_url) {
        await fs.unlink(
          path.join(
            process.cwd(),
            PROFILE_PICTURES_PATH,
            previousUserState.profile_picture_url
          )
        )
      } // end if
    } catch (err) {
      // An error occurred while deleting a file.
      // Log the issue.
      console.log(err)

      // Response with an error.
      return NextResponse.json(
        { message: INTERNAL_SERVER_ERROR },
        { status: 500 }
      )
    } // end try-catch

    // Get a file.
    profilePictureFile = formData.get('profilePicture')

    // Check the file type.
    if (!profilePictureFile.type.includes('image')) {
      // It is a wrong file type, return an error.
      console.log('Wrong file type for profile picture')

      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 }
      )
    } // end if

    // Get a file extension.
    fileExtension = path.extname(profilePictureFile.name)

    // Convert file data to a buffer.
    buffer = Buffer.from(await profilePictureFile.arrayBuffer())

    // Generate a filepath.
    filePath = path.join(
      process.cwd(),
      PROFILE_PICTURES_PATH,
      `${previousUserState.user_uuid}${fileExtension}`
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

      return NextResponse.json(
        { message: INTERNAL_SERVER_ERROR },
        { status: 500 }
      )
    } // end try-catch
  } // end if

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
        ...(filePath && {
          profile_picture_url: path.join(
            PROFILE_PICTURES_PATH,
            `${previousUserState.user_uuid}${fileExtension}`
          )
        }) // Conditionally include profile_picture_url only if filePath exists
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
