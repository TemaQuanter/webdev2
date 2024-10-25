/*
    This file contains a logic for listing a new product.
*/

import { INTERNAL_SERVER_ERROR, PRODUCT_IMAGES_PATH } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { isFile } from '@/utils/functions'

export const POST = async (req) => {
  console.log('list_item api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Try to decrypt and verify the access token.
  const decoded = await verifyJWT(TYPE_ACCESS_TOKEN, accessToken.value)

  let productImageFile
  let buffer

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

  // Get the data of a product to list.
  const formData = await req.formData()

  console.log(formData)

  // Make sure that the title is set and that it is valid.
  if (
    !formData.get('productTitle') ||
    formData.get('productTitle').length < 2
  ) {
    // Product title is invalid.
    return NextResponse.json(
      { message: 'Product title must be at least 3 characters.' },
      { status: 400 }
    )
  } // end if

  // Make sure that there is a product description.
  if (
    !formData.get('productDescription') ||
    formData.get('productDescription').length > 200 ||
    formData.get('productDescription').length < 20
  ) {
    // Product description is invalid.
    return NextResponse.json(
      {
        message: 'Product description must be from 20 to 200 characters'
      },
      { status: 401 }
    )
  } // end if

  // Make sure that the product category is set correctly.
  if (
    !formData.get('productCategory') ||
    typeof formData.get('productCategory') !== 'string'
  ) {
    // The product price is either not set or not a number.
    return NextResponse.json(
      {
        message: 'Product category must be a string.'
      },
      { status: 400 }
    )
  } // end if

  // Make sure that the image is provided and that the format of the image is valid.
  if (
    !isFile(formData.get('productImage')) ||
    !formData.get('productImage').type.includes('image') ||
    formData.get('productImage').size > 10485760
  ) {
    // The product image is invalid.
    return NextResponse.json(
      {
        message:
          'Product image file invalid, must be an image (e.g. .jpg/.png) and less than 10MB'
      },
      { status: 400 }
    )
  } // end if

  // Make sure that the price is set correctly.
  if (
    !formData.get('productPrice') ||
    isNaN(Number(formData.get('productPrice')))
  ) {
    // The product price is either not set or not a number.
    return NextResponse.json(
      {
        message: 'Product price is either not set or not a number'
      },
      { status: 400 }
    )
  } // end if

  // Make sure that the number of products is set correctly.
  if (
    !formData.get('numberOfItems') ||
    isNaN(Number(formData.get('numberOfItems')))
  ) {
    // The product price is either not set or not a number.
    return NextResponse.json(
      {
        message: 'Number of product items is either not set or not a number'
      },
      { status: 400 }
    )
  } // end if

  // Get a file with product image.
  productImageFile = formData.get('productImage')

  // Get a file extension.
  const fileExtension = path.extname(productImageFile.name)

  // Generate a filepath.
  let filePath = path.join(PRODUCT_IMAGES_PATH, `${uuidv4()}${fileExtension}`)

  // Create a new instance of a product to be listed.
  let newProduct = {
    title: formData.get('productTitle'),
    description: formData.get('productDescription'),
    image_url: filePath,
    price: Number(formData.get('productPrice')),
    number_of_items: Number(formData.get('numberOfItems'))
  } // end newProduct

  // Define an absolute file path.
  filePath = path.join(process.cwd(), filePath)

  // Try to insert a new product to the database.
  try {
    // Insert a new product to the database and save a product image
    // in a single transaction.
    const insertedProduct = await prisma.$transaction(async (prisma) => {
      // Insert a new product to the database.
      const product = await prisma.products.create({
        data: {
          ...newProduct,
          categories: {
            connect: {
              // Use a UUID to set a foreign key relationship.
              category_uuid: formData.get('productCategory')
            }
          },
          users: {
            connect: {
              user_id: userId
            }
          }
        }
      })

      console.log(product)

      // Set the product image.

      // Convert file data to a buffer.
      buffer = Buffer.from(await productImageFile.arrayBuffer())

      // Save the profile picture to the required path.

      console.log(filePath)

      // Write the file to the file system.
      await fs.writeFile(filePath, buffer)
      console.log(`File saved at: ${filePath}`)
    })
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

  // Return the user.
  return NextResponse.json({}, { status: 200 })
} // end function POST
