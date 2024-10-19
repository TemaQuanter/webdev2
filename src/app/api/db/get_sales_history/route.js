/*
    This file contains a logic for retrieving entire sales history.
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
  let salesHistory

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
    // Retrieve all the required user data from the database.
    salesHistory = await prisma.purchases.findMany({
      where: {
        users_purchases_seller_idTousers: {
          user_id: userId
        }
      },
      select: {
        products: {
          select: {
            title: true,
            description: true,
            product_uuid: true,
            price: true,
            users: {
              select: {
                first_name: true,
                last_name: true
              }
            },
            image_url: true
          }
        },
        number_of_items: true,
        purchase_date: true
      }
    })

    console.log(salesHistory)
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

  // Return the sales history.
  return NextResponse.json(salesHistory, { status: 200 })
} // end function GET
