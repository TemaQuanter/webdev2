'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Image from 'next/image'

const EditProfile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate a save action
    alert(`Profile updated: ${firstName} ${lastName}`)
    // You can replace this with an API call to save the updated information
  }

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100">
        <Button
          variant="outline-secondary"
          style={{ margin: '3rem 0 0 3rem' }}
          className="btn btn-sm"
        >
          <Link
            href="/account"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <i className="bi bi-chevron-left"></i>
          </Link>
        </Button>
      </div>

      <Image
        src={
          profilePic
            ? URL.createObjectURL(profilePic)
            : '/images/default_profile.png'
        }
        width={150}
        height={150}
        style={{ borderRadius: '50%', marginTop: '3rem' }}
        alt="Profile picture"
      />

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
