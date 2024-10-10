'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { INTERNAL_SERVER_ERROR } from '@/constants'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const router = useRouter()

  // This function is executed when a user clicks login button.
  const handleSubmit = async (e) => {
    // Prevent the browser from re-direction to another page.
    // Prevent the browser from re-loading the current page.
    e.preventDefault()

    // Clear any existing errors
    setError(null)

    // Try to make a call to login api.
    try {
      // Make a call to login api and send user credentials to it.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      // If the server response was positive (200)
      // Then retrieve access token and store it in local storage on user's device.
      if (response.ok) {
        // The user logged in successfully.
        // Redirect the user to their account.
        router.push('/account')
      } else {
        // The user failed to login in.
        // (Either credentials were wrong or something else happened on the back-end)
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (err) {
      // Failed to send a request to the login endpoint.
      setError(INTERNAL_SERVER_ERROR)
    } // end try-catch
  } // end function handleSubmit

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <div
        style={{
          width: '15rem',
          height: '5rem',
          backgroundColor: 'grey',
          marginTop: '3rem'
        }}
      ></div>

      <p style={{ marginTop: '2rem' }} className="fs-4 fw-bold">
        Sign in to your account
      </p>
      <p className="fs-6 fw-bold">
        New to our website? <Link href="/sign_up">create account</Link>
      </p>

      {/* An error message, if it is necessary to display it. */}
      {error && <p className="text-danger">{error}</p>}

      {/* Login form */}
      <Form
        className="d-flex flex-column align-items-center"
        style={{ width: '80vw', maxWidth: '30rem' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3 w-100" controlId="formSignInEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formSignInPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          style={{ borderRadius: '20px' }}
          className="w-100"
          variant="primary"
          type="submit"
        >
          Sign In
        </Button>
      </Form>

      {/* Divider with "or" */}
      <div className="d-flex align-items-center my-3 w-100">
        <hr className="flex-grow-1" />
        <span className="mx-2">or</span>
        <hr className="flex-grow-1" />
      </div>

      {/* Other authentication methods */}
      <Button
        variant="secondary"
        style={{ width: '80vw', maxWidth: '30rem', borderRadius: '20px' }}
      >
        <i className="bi bi-google" style={{ marginRight: '1rem' }}></i>
        Sign in with Google
      </Button>
      <Link href="/" style={{ marginTop: '1rem' }}>
        &lt; Back
      </Link>
    </div>
  )
}

export default SignIn
