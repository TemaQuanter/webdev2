/*
    This file contains a logic for updating an existing product.
*/

import { INTERNAL_SERVER_ERROR, PRODUCT_IMAGES_PATH } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { isFile, isImageFile } from '@/utils/functions'

export const PUT = async (req) => {
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
    isFile(formData.get('productImage')) &&
    (!formData.get('productImage').type.includes('image') ||
      formData.get('productImage').size > 10485760 ||
      !isImageFile(formData.get('productImage')))
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

  // Make sure that the product UUID is set correctly.
  if (
    !formData.get('productUUId') ||
    typeof formData.get('productUUId') !== 'string'
  ) {
    // The product price is either not set or not a number.
    return NextResponse.json(
      {
        message: 'productUUId must be a string.'
      },
      { status: 400 }
    )
  } // end if

  // Create a new instance of a product to be listed.
  let updatedProduct = {
    title: formData.get('productTitle'),
    description: formData.get('productDescription'),
    price: Number(formData.get('productPrice')),
    number_of_items: Number(formData.get('numberOfItems'))
  } // end updatedProduct

  // Try to update a product in the database.
  try {
    // Update a product in the database and save a product image
    // in a single transaction.
    const updatedItem = await prisma.$transaction(async (prisma) => {
      // Make sure that the user updating the product is
      // the actual seller of the product.
      const currentProduct = await prisma.products.findUnique({
        where: {
          seller_id: userId,
          product_uuid: formData.get('productUUId')
        }
      })

      // Check if the product was found.
      if (!currentProduct) {
        // The product does not belong to the user.
        throw new Error(
          'The product either does not exist or it has another owner.'
        )
      } // end if

      // Update product in the database.
      const product = await prisma.products.update({
        where: {
          product_uuid: formData.get('productUUId')
        },
        data: {
          ...updatedProduct,
          categories: {
            connect: {
              // Use a UUID to set a foreign key relationship.
              category_uuid: formData.get('productCategory')
            }
          }
        }
      })

      console.log(product)

      // Check if a new product image was set.
      // If it was set, then update the product image.
      if (isFile(formData.get('productImage'))) {
        // Set a new product image.

        // Get a file.
        productImageFile = formData.get('productImage')

        // Get a file extension.
        const fileExtension = path.extname(productImageFile.name)

        // Convert file data to a buffer.
        buffer = Buffer.from(await productImageFile.arrayBuffer())

        // Save the profile picture to the required path.

        // Generate a unique UUIDV for the product image.
        const filePathUUIDV4 = uuidv4()

        // Generate a filepath.
        const filePath = path.join(
          process.cwd(),
          PRODUCT_IMAGES_PATH,
          `${filePathUUIDV4}${fileExtension}`
        )

        console.log(filePath)

        // Write the file to the file system.
        await fs.writeFile(filePath, buffer)
        console.log(`File saved at: ${filePath}`)

        // Update the image path for the product.
        await prisma.products.update({
          where: {
            product_id: product.product_id
          },
          data: {
            image_url: path.join(
              PRODUCT_IMAGES_PATH,
              `${filePathUUIDV4}${fileExtension}`
            )
          }
        })
      } // end if
    }) // end transaction
  } catch (err) {
    // Log the error.
    console.log(err)

    // Check if the user tries to update someone else's product.
    if (
      err.message ===
      'The product either does not exist or it has another owner.'
    ) {
      return NextResponse.json({ message: err.message }, { status: 401 })
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

  // Return the user.
  return NextResponse.json({}, { status: 200 })
} // end function PUT
