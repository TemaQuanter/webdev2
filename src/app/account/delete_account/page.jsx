'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        // Show the user an alert that their account was successfully deleted.
        alert('Your account was successfully removed')

        // Redirect the user with hard reload to the main page.
        window.location.href = '/'
      } else {
        // An error occurred while trying to delete an account.

        // Get the error.
        const errorData = await response.json()

        // Log the error.
        console.log(errorData.message)

        // Display the error to the user.
        setError(errorData.message)
      } // end if
    } catch (err) {
      // An error occurred while deleting an account.

      // Log the error.
      console.log(err)

      // Display the error to the user.
      setError(err)
    } // end try-catch
  } // end function handleAccountRemoval

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <h1 style={{ margin: '2rem 0 2rem 0' }}>Account removal</h1>

      <div class="alert alert-danger" role="alert">
        <b>WARNING:</b> As you remove your account, it will be permanently
        deleted and it will be impossible to restore it.
      </div>

      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}

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
    </div>
  )
}

export default EmailVerification
