/*
    This file contains a logic for retrieving all product categories
    from the database.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  console.log('get_product_categories api triggered')

  // Data that will be retrieved from the database.
  let categories

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required categories data from the database.
    categories = await prisma.categories.findMany({
      select: {
        category_id: true,
        name: true
      }
    })

    console.log(categories)
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

  // Return the categories.
  return NextResponse.json(categories, { status: 200 })
} // end function GET
