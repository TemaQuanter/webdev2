/*
    This file contains a logic for adding an item to cart.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('add_to_cart api triggered')

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

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Get the data of a product to list.
  const data = await req.json()

  console.log(data)

  // Check that all required fields were supplied.
  if (data.productUUId === null || !(typeof data.productUUId === 'string')) {
    // Return an error.
    return NextResponse.json(
      {
        message: 'productUUId must be a string'
      },
      { status: 400 }
    )
  } // end if

  if (data.numberOfItems === null) {
    // Return an error.
    return NextResponse.json(
      {
        message: 'numberOfItems must be a Number'
      },
      { status: 400 }
    )
  } // end if

  // Try to add a product to cart in the database.
  try {
    // Get the product that should be added to the cart.
    const product = await prisma.products.findUnique({
      where: {
        product_uuid: data.productUUId
      },
      select: {
        product_id: true,
        seller_id: true
      }
    })

    // The user cannot buy their own products.
    if (userId === Number(product.seller_id)) {
      // Return an error.
      return NextResponse.json(
        { message: 'A user cannot buy their own products' },
        { status: 400 }
      )
    } // end

    // Try to retrieve the item from the cart.
    const retrievedItem = await prisma.cart.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: product.product_id
        }
      }
    })

    // If the product was retrieved.
    if (retrievedItem) {
      // Check either it is necessary to remove a product from the cart or not.
      if (Number(data.numberOfItems) === 0) {
        // Remove the product from the cart.
        const removedProduct = await prisma.cart.delete({
          where: {
            user_id_product_id: {
              user_id: userId,
              product_id: product.product_id
            }
          }
        })
      } else {
        // Change the number of products in the cart.
        const productInCart = await prisma.cart.update({
          where: {
            user_id_product_id: {
              user_id: userId,
              product_id: product.product_id
            }
          },
          data: {
            number_of_items: Number(data.numberOfItems)
          }
        })
      } // end if
    } else if (Number(data.numberOfItems) > 0) {
      // The product was not added to the cart still.
      // Insert it to the cart.
      const productInCart = await prisma.cart.create({
        data: {
          users: {
            connect: {
              user_id: userId
            }
          },
          products: {
            connect: {
              product_uuid: data.productUUId
            }
          },
          number_of_items: Number(data.numberOfItems)
        }
      })
    } // end if
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
