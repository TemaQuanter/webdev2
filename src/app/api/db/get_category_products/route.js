/*
    This file contains a logic for retrieving category
    information and some product related to it.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('get_category_products api triggered')

  // Retrieve the request data.
  const data = await req.json()

  // Make sure that the category UUID was passed.
  if (typeof data.categoryUUId !== 'string') {
    // Return an error.
    return NextResponse.json(
      { message: 'categoryUUId must be a string' },
      { status: 400 }
    )
  } // end if

  // Make sure that the product page is passed and is a number
  if (!data.pageNumber || isNaN(Number(data.pageNumber))) {
    // Return an error.
    return NextResponse.json(
      { message: 'pageNumber must be an number' },
      { status: 400 }
    )
  } // end if

  // Make sure that the result limit is passed and is a number
  if (!data.resultLimit || isNaN(Number(data.resultLimit))) {
    // Return an error.
    return NextResponse.json(
      { message: 'resultLimit must be an number' },
      { status: 400 }
    )
  } // end if

  // Data that will be retrieved from the database.
  let category
  let categoryProducts

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required categories data from the database.
    category = await prisma.categories.findUnique({
      where: {
        category_uuid: data.categoryUUId
      },
      select: {
        category_uuid: true,
        name: true,
        category_motto: true,
        banner_url: true
      }
    })

    // Retrieve the category products.
    categoryProducts =
      await prisma.$queryRaw`SELECT * FROM search_category_products(${data.categoryUUId}::UUID, ${data.resultLimit}::INT, ${data.pageNumber}::INT);`
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

  // Put the category products into category.
  category.products = [...categoryProducts]

  console.log(category)

  // Return the data.
  return NextResponse.json(category, { status: 200 })
} // end function POST
