/*
    This file handles a user registration procedure.
*/

import { NextResponse } from 'next/server'

export async function POST(req) {
  // Retrieve the request data.
  const body = await req.json()

  // Debug output.
  console.log(body.firstName)
  console.log(body.lastName)
  console.log(body.email)
  console.log(body.password)
  console.log(body.repeatPassword)

  // Make sure that the passwords match.
  if (body.password !== body.repeatPassword) {
    // Return an error.
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 }
    )
  } // end if

  // Generate a fake successful response.
  return NextResponse.json({ status: 200 })
} // end function POST
