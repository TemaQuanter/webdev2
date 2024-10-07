'use client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function SignIn() {
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
        New to our website? <Link href="#">create account</Link>
      </p>

      {/* Login form */}
      <Form
        className="d-flex flex-column align-items-center"
        style={{ width: '80vw', maxWidth: '30rem' }}
      >
        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          style={{ borderRadius: '20px' }}
          className="w-100"
          variant="primary"
          type="submit"
        >
          Submit
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
        <i class="bi bi-google" style={{ marginRight: '1rem' }}></i>
        Sign in with Google
      </Button>
      <Link href="/" style={{ marginTop: '1rem' }}>
        &lt; Back
      </Link>
    </div>
  )
}
