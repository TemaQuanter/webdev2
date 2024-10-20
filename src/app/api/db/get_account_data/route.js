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
  let user
  let numOfPurchases
  let numOfSales

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
    user = await prisma.users.findUnique({
      where: {
        user_id: userId
      },
      select: {
        user_uuid: true,
        first_name: true,
        last_name: true,
        email: true,
        verification: {
          select: {
            email_is_verified: true
          }
        },
        balance: true
      }
    })

    console.log(user)

    // Calculate the number of purchases.
    numOfPurchases =
      (
        await prisma.purchases.aggregate({
          _sum: {
            number_of_items: true
          },
          where: {
            buyer_id: userId
          }
        })
      )._sum.number_of_items || 0

    // Calculate the number of sales.
    numOfSales =
      (
        await prisma.purchases.aggregate({
          _sum: {
            number_of_items: true
          },
          where: {
            seller_id: userId
          }
        })
      )._sum.number_of_items || 0

    console.log(numOfSales)
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

  // Add separately calculated fields into the user.
  user.numOfPurchases = numOfPurchases
  user.numOfSales = numOfSales

  // Return the user.
  return NextResponse.json(user, { status: 200 })
} // end function GET
