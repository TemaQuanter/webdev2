/*
    This file handles a user registration procedure.
*/

export async function POST(req) {
  // Retrieve the request data.
  const body = await req.json()

  // Debug output.
  console.log(body.first_name)
  console.log(body.last_name)
  console.log(body.email)
  console.log(body.password)
  console.log(body.password_repeat)

  // Generate a fake successful response.
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
} // end function POST
