'use client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useState } from 'react'
import { INTERNAL_SERVER_ERROR } from '@/constants'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import Toastify CSS

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  // Error to be displayed in case something goes wrong.
  const handleSubmit = async (e) => {
    // Prevent a default behavior.
    e.preventDefault()

    // Make sure that password and repeat password match.
    if (password !== repeatPassword) {
      // Display an error toast.
      toast.error('Passwords do not match.')
      return
    }

    // Try to make a call to register API.
    try {
      // Make a call to registration API and send user credentials to it.
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          repeatPassword
        })
      })

      // Check the server response.
      const responseData = await response.json()

      if (response.ok) {
        // Display a success toast
        toast.success(
          responseData.message || 'Registration successful! Redirecting...'
        )
        // Redirect after a short delay to allow the user to see the toast message
        setTimeout(() => {
          window.location.assign('/sign_in')
        }, 1000) // 2-second delay before redirect
      } else {
        // Display an error toast if the server responds with an error
        toast.error(
          responseData.message || 'Registration failed. Please try again.'
        )
      }
    } catch (err) {
      // Display an error toast if the request fails
      toast.error(
        INTERNAL_SERVER_ERROR || 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <img
        src="/images/Logo.png"
        alt="Description of image"
        className="responsive-img"
        style={{ marginTop: '3rem' }}
      />

      <p style={{ marginTop: '2rem' }} className="fs-4 fw-bold">
        Sign up
      </p>

      {/* Registration form */}
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

      {/* Add ToastContainer to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  )
}

export default SignUp
