'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import Toastify CSS

const EmailVerification = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleAccountRemoval = async (e) => {
    e.preventDefault()
    setError(null)

    // Make a call to the delete API.
    try {
      const response = await fetch('/api/auth/delete_account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password: password })
      })

      // Check if the request was successful.
      if (response.ok) {
        // Account was successfully deleted.
        // Show the user a success toast.
        toast.success('Your account was successfully removed.')

        // Redirect the user with a delay to allow the toast to be seen.
        setTimeout(() => {
          window.location.href = '/'
        }, 1000) // 2-second delay
      } else {
        // An error occurred while trying to delete an account.

        // Get the error response.
        const errorData = await response.json()

        // Display the error toast to the user.
        toast.error(errorData.message || 'Failed to remove account.')
      }
    } catch (err) {
      // An error occurred while deleting an account.

      // Log the error.
      console.error(err)

      // Display a general error toast to the user.
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <h1 style={{ margin: '2rem 0 2rem 0' }}>Account removal</h1>

      <div className="alert alert-danger" role="alert">
        <b>WARNING:</b> As you remove your account, it will be permanently
        deleted and it will be impossible to restore it.
      </div>

      {/* Form for account removal */}
      <Form
        style={{ width: '80vw', maxWidth: '30rem' }}
        onSubmit={handleAccountRemoval}
      >
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the password from your account"
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
          Delete account
        </Button>
      </Form>

      {/* ToastContainer to display toast notifications */}
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

export default EmailVerification
