/*
    This file contains a logic for retrieving all publicly available
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('get_product_public_data api triggered')

  // Retrieve the user credentials from the request.
  let data = await req.json()

  // Verify that the uuid of the user is included in the request.
  if (data.product_uuid === null) {
    // Return an error.
    return NextResponse.json(
      { message: 'product_uuid must be specified' },
      { status: 400 }
    )
  } // end if

  // Data that will be retrieved from the database.
  let product

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required product data from the database.
    product = await prisma.products.findUnique({
      where: {
        product_uuid: data.product_uuid
      },
      select: {
        product_uuid: true,
        users: {
          select: {
            user_uuid: true,
            first_name: true,
            last_name: true
          }
        },
        categories: {
          select: {
            category_uuid: true,
            name: true
          }
        },
        title: true,
        description: true,
        image_url: true,
        price: true,
        number_of_items: true
      }
    })

    console.log(product)
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

  // Return the product.
  return NextResponse.json(product, { status: 200 })
} // end function POST
