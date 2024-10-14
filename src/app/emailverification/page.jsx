'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EmailVerification = () => {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (email.includes('@')) {
      setMessage('Verification code sent to your email!')
    } else {
      setError('Please enter a valid email address.')
    }
  }

  const handleVerificationSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (verificationCode === '123456') {
      setMessage('Email verified successfully!')
    } else {
      setError('Invalid verification code. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <h1>Email Verification</h1>

      {error && <p className="text-danger">{error}</p>}

      {message && <p className="text-success">{message}</p>}

      <Form
        className="w-100"
        style={{ maxWidth: '30rem' }}
        onSubmit={handleEmailSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          style={{ borderRadius: '20px' }}
          className="w-100 mb-3"
          variant="primary"
          type="submit"
        >
          Send Verification Code
        </Button>
      </Form>

      <Form
        className="w-100"
        style={{ maxWidth: '30rem' }}
        onSubmit={handleVerificationSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Enter Verification Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the code sent to your email"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          style={{ borderRadius: '20px' }}
          className="w-100"
          variant="primary"
          type="submit"
        >
          Verify Email
        </Button>
      </Form>
    </div>
  )
}

export default EmailVerification
