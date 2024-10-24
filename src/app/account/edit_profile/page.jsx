'use client'

import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ButtonBack from '@/components/ButtonBack'

const EditProfile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const router = useRouter()

  // Retrieve the existing user information from the database.
  useEffect(() => {
    console.log('useEffect started')

    const handleDatabaseRequest = async () => {
      // Retrieve the existing user information from the database.
      try {
        const response = await fetch('/api/db/get_account_data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        // Check if the data retrieval was successful.
        if (response.ok) {
          // The response was successful.
          // Get the data from the response.
          const body = await response.json()

          // Set the user.
          setUser(body)

          // Set the existing user data in the fields.
          setFirstName(body.first_name)
          setLastName(body.last_name)
          setProfilePic(body.profile_picture)
        } else {
          // An error occurred while trying to retrieve the data.

          // Get error data.
          const errorData = await response.json()

          // Log the error.
          console.log(errorData.message)

          // Display the error message to the user.
          setError(errorData.message)
        } // end if
      } catch (err) {
        // Show the error to the user.
        setError(err)

        // Log the error.
        console.log(err)
      } // end try-catch
    } // end function handleDatabaseRequest

    // Call the function to retrieve the current user data from the database.
    handleDatabaseRequest()
  }, [])

  const handleSubmit = async (e) => {
    // Prevent the default browser behavior (page reload).
    e.preventDefault()

    // Make sure that the changes to the user account are valid.

    // Check the name.
    if (firstName.length < 1) {
      // The user name is invalid.
      setError('User name must be at least 1 character long.')
      return
    } // end if

    // Check the last name.
    if (lastName.length < 1) {
      // The user last name is invalid.
      setError('User last name must be at least 1 character long.')
      return
    } // end if

    // Create a form data.
    const formData = new FormData()

    // Append the text fields to the form.
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)

    // Set the profile picture if provided.
    formData.append('profilePicture', profilePic)

    try {
      // Send a request to update the user data in the database.
      const response = await fetch('/api/db/update_account_data', {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })

      console.log(response)

      // Check if the update was successful.
      if (response.ok) {
        // Successful update.
        // Redirect the user to the main account page.
        // Do hard reload to update the user data after changes.
        window.location.href = '/account'
      } else {
        // An error occurred.

        // Retrieve the error from the response.
        const errorData = await response.json()

        // Log the error.
        console.log(errorData.message)

        // Show the error to the user.
        setError(errorData.message)
      } // end if
    } catch (err) {
      // Show the error to the user.
      setError(err)

      // Log the error.
      console.log(err)
    } // end try-catch
  } // end function handleSubmit

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <ButtonBack href="/account" />

      <img
        src={
          profilePic
            ? URL.createObjectURL(profilePic)
            : '/api/db/get_profile_picture'
        }
        width={150}
        height={150}
        style={{
          borderRadius: '50%',
          marginTop: '3rem',
          objectFit: 'cover', // Maintains the picture scale.
          objectPosition: 'top' // Crops the bottom of the image.
        }}
        alt="Profile picture"
      />

      {/* Display an error, if necessary */}
      {error && <p className="text-danger">{error}</p>}

      <Form
        className="w-100"
        style={{ maxWidth: '30rem' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          style={{
            width: '100%',
            borderRadius: '20px',
            margin: '2rem 0 0 0'
          }}
          type="submit"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  )
}

export default EditProfile
