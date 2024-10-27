/*
    This file contains a logic for retrieving dynamic public images.
*/

import { INTERNAL_SERVER_ERROR, PRODUCT_IMAGES_PATH } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const GET = async (req) => {
  console.log('get_product_image api triggered')

  // Get search parameters.
  const { searchParams } = req.nextUrl

  // Get image path that has to be read.
  let imagePath = searchParams.get('imagePath')

  // Sanitize imagePath by removing any `../` sequences.
  imagePath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '')

  // Construct the image path.
  const imagePathRoot = path.join(process.cwd(), PRODUCT_IMAGES_PATH)

  // Remove any occurrence of imagePathRoot from the beginning of imagePath if it exists.
  if (imagePath.startsWith(PRODUCT_IMAGES_PATH)) {
    imagePath = imagePath.slice(PRODUCT_IMAGES_PATH.length)
  } // end if

  // Resolve the cleaned-up imagePath relative to imagePathRoot.
  imagePath = path.resolve(imagePathRoot, `./${imagePath}`)

  // Check that the image path starts with a secure imagePathRoot.
  if (!imagePath.startsWith(imagePathRoot)) {
    // The path is unsecure.
    return NextResponse.json(
      { message: 'Incorrect image path' },
      { status: 400 }
    )
  } // end if

  // Check if the image file exists before attempting to read.
  try {
    // This will throw an error if the file does not exist.
    await fs.access(imagePath)
  } catch (err) {
    console.log('File does not exist:', err)
    return NextResponse.json(
      { message: 'Incorrect image path' },
      { status: 404 }
    )
  } // end try-catch

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
        'Content-Disposition': 'inline; filename="image.jpg"' // Optional
      }
    })
  } catch (err) {
    // An error occurred while reading the file.
    console.log(err)
    return NextResponse.json(
      { message: 'Error reading profile picture' },
      { status: 500 }
    )
  } // end try-catch
} // end function GET
