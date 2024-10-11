/*
    This file contains a logic for retrieving all
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(req) {
  console.log('get_account_data api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Decoded access token.
  let decoded

  // Data that will be retrieved from the database.
  let user
  let numOfPurchases
  let numOfSales

  // Try to decrypt and verify the access token.
  try {
    decoded = jwt.verify(accessToken.value, process.env.ACCESS_TOKEN_SECRET)

    // Display the decoded access token.
    console.log(decoded)
  } catch (err) {
    // An error occurred during token verification.

    // Log the error.
    console.log(err)

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
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_picture: true,
        verification: {
          select: {
            email_is_verified: true
          }
        },
        balance: true
      }
    })

    // Calculate the number of purchases.
    numOfPurchases = await prisma.purchases.count({
      where: {
        buyer_id: userId
      }
    })

    // Calculate the number of sales.
    numOfSales = await prisma.purchases.count({
      where: {
        seller_id: userId
      }
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

  // Add separately calculated fields into the user.
  user = {
    ...user,
    numOfPurchases,
    numOfSales
  }

  // Return the user.
  return NextResponse.json(user, { status: 200 })
} // end function GET
