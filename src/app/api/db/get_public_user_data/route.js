/*
    This file contains a logic for retrieving all publicly available
    general information about user account.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('get_account_data api triggered')

  // Retrieve the user credentials from the request.
  let data = await req.json()

  // Verify that the uuid of the user is included in the request.
  if (data.user_uuid === null) {
    // Return an error.
    return NextResponse.json(
      { message: 'user_uuid must be specified' },
      { status: 400 }
    )
  } // end if

  // Data that will be retrieved from the database.
  let user

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to retrieve the necessary data.
  try {
    // Retrieve all the required user data from the database.
    user = await prisma.users.findUnique({
      where: {
        user_uuid: data.user_uuid
      },
      select: {
        user_uuid: true,
        first_name: true,
        last_name: true
      }
    })

    console.log(user)
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
  return NextResponse.json(user, { status: 200 })
} // end function POST
