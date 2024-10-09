/*
    This file handles user login.
*/

export async function POST(req) {
  const body = await req.json()

  console.log(body)
  console.log(body.email)
  console.log(body.password)

  return new Response(JSON.stringify({ email: 'test', password: 'test' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
