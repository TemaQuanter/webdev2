'use client'

import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { INTERNAL_SERVER_ERROR } from '@/constants'
import Cookies from 'js-cookie' // Import js-cookie for cookie handling

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  // Use useEffect to clear any existing tokens when the component loads
  //   useEffect(() => {
  //     console.log('Clearing any old tokens...')
  //     Cookies.remove('accessToken') // Remove accessToken
  //     Cookies.remove('refreshToken') // Remove refreshToken
  //   }, [])

  const handleSubmit = async (e) => {
    // Prevent the page from automatic reload.
    e.preventDefault()

    setError(null)
    console.log('Starting login process...')

    // Try to log in.
    try {
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensures cookies are included
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Login failed:', errorData.message)
        setError(errorData.message)
        return
      } // end if

      console.log('Login successful, reloading page...')
      // Force a full page reload to ensure cookies are set and state is correct
      window.location.href = '/account'
    } catch (err) {
      console.error('Login process failed with error:', err)
      setError(INTERNAL_SERVER_ERROR)
    } // end try-catch
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
        Sign in to your account
      </p>
      <p className="fs-6 fw-bold">
        New to our website? <Link href="/sign_up">Create account</Link>
      </p>

      {error && <p className="text-danger">{error}</p>}

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
    </div>
  )
}

export default SignIn
