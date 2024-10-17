/*
    This file contains a logic for retrieving all product categories
    from the database.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('get_search_results api triggered')

  // Get the request data.
  const body = await req.json()

  // Data that will be retrieved from the database.
  let products

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required products data from the database.
    products =
      await prisma.$queryRaw`SELECT * FROM search_products(${body.productSearchText});`

    console.log(products)
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

  // Return the products.
  return NextResponse.json(products, { status: 200 })
} // end function POST
