import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const DELETE = async (req) => {
  const prisma = new PrismaClient()

  try {
    const body = await req.json()
    console.log('Received DELETE request for user email:', body.email)

    // First, delete the associated verification record
    const deletedVerification = await prisma.verification.delete({
      where: {
        user_id: (
          await prisma.users.findUnique({
            where: { email: body.email }
          })
        ).user_id
      }
    })
    console.log('Deleted verification record:', deletedVerification)

    // Then delete the user based on the provided email
    const deletedUser = await prisma.users.delete({
      where: {
        email: body.email
      }
    })
    console.log('User deleted successfully:', deletedUser)

    return NextResponse.json(
      { message: 'Account deleted successfully.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error deleting user:', err)

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
    await prisma.$disconnect()
  }
}
