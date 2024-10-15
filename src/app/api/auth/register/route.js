/*
    This file handles a user registration procedure.
*/

import {
  INTERNAL_SERVER_ERROR,
  MIN_PASSWORD_LENGTH,
  SALT_ROUNDS
} from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (req) => {
  // Retrieve the request data.
  const body = await req.json()

  // Make sure that the passwords match.
  if (body.password !== body.repeatPassword) {
    // Return an error.
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 }
    )
  } // end if

  // Do not allow short passwords.
  if (body.password.length < MIN_PASSWORD_LENGTH) {
    // Return an error.
    return NextResponse.json(
      {
        message: `Minimum password length is ${MIN_PASSWORD_LENGTH} characters.`
      },
      { status: 400 }
    )
  } // end if

  // Hash the password for enhanced security.
  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS)

  // Create a new user for the database.
  const newUser = {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    password: hashedPassword,
    balance: 1000.0
  } // end newUser

  // Initialize connection to the database.
  const prisma = new PrismaClient()

  // Try to add the user to the database.
  try {
    const insertedUser = await prisma.users.create({
      data: { ...newUser }
    })
  } catch (err) {
    // Check if the user with such email address already exists.
    if (err.code === 'P2002' && err.meta.target[0] === 'email') {
      // Return an error message that the user with such email address already
      // exists.
      return NextResponse.json(
        {
          message:
            'The user with such email address already exists. Please, log in.'
        },
        { status: 401 }
      )
    } else {
      // Return a general error.
      return NextResponse.json(
        { message: INTERNAL_SERVER_ERROR },
        { status: 500 }
      )
    } // end if
  } finally {
    // Disconnect from the database.
    await prisma.$disconnect()
  } // end try-catch

  // Return a success.
  return NextResponse.json({}, { status: 200 })
} // end function POST
