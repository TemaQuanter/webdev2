import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const DELETE = async (req) => {
  const prisma = new PrismaClient()
  const body = await req.json() // Parse the request body

  try {
    // Delete the user based on the provided email
    const deletedUser = await prisma.users.delete({
      where: {
        email: body.email
      }
    })

    // Return success response
    return NextResponse.json(
      { message: 'Account deleted successfully.' },
      { status: 200 }
    )
  } catch (err) {
    // Handle case where no user was found with the provided email
    if (err.code === 'P2025') {
      return NextResponse.json(
        { message: 'No user found with this email.' },
        { status: 404 }
      )
    } else {
      return NextResponse.json(
        { message: 'Internal server error.' },
        { status: 500 }
      )
    }
  } finally {
    await prisma.$disconnect() // Disconnect from the database
  }
}
