/*
    This file contains a logic for retrieving all
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { TYPE_ACCESS_TOKEN, verifyJWT } from '@/utils/jwt_manager'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  console.log('get_account_data api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Data that will be retrieved from the database.
  let listedItems

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

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required products data from the database.
    listedItems = await prisma.products.findMany({
      where: {
        seller_id: userId
      },
      select: {
        product_uuid: true,
        title: true,
        description: true,
        image_url: true,
        price: true,
        number_of_items: true
      }
    })

    console.log(listedItems)
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

  // Return the listed items.
  return NextResponse.json(listedItems, { status: 200 })
} // end function GET
