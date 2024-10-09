'use client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  // Error to be displayed in case something goes wrong.
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    // Prevent a default behavior.
    e.preventDefault()

    // Clear any existing errors.
    setError(null)

    // Make sure that password and repeat password match.
    if (password !== repeatPassword) {
      // Display an error.
      setError('Passwords do not match.')

      return
    } // end if

    // Try to make a call to register api.
    try {
      // Make a call to registration api and send user credentials to it.
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          repeatPassword
        })
      })

      // Check the server response.
      if (response.ok) {
        // The response is OK and it is possible to proceed further.
        // Get the returned data.
        const data = await response.json()

        console.log(data)
      } else {
        // An error was returned.
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (err) {
      setError('An error occurred. Please, try again later.')
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
        Sign up
      </p>

      {/* An error message, if it is necessary to display it. */}
      {error && <p className="text-danger">{error}</p>}

      {/* Login form */}
      <Form
        className="d-flex flex-column align-items-center"
        style={{ width: '80vw', maxWidth: '30rem' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3 w-100" controlId="formSignUpFirstName">
          <Form.Control
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formSignUpSecondName">
          <Form.Control
            type="text"
            placeholder="Second name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formSignUpEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formSignUpPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formSignUpPasswordRepeat">
          <Form.Control
            type="password"
            placeholder="Password repeat"
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          style={{ borderRadius: '20px' }}
          className="w-100"
          variant="primary"
          type="submit"
        >
          Sign Up
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
        Sign up with Google
      </Button>
      <Link href="/" style={{ marginTop: '1rem' }}>
        &lt; Back
      </Link>
    </div>
  )
}

export default SignUp
