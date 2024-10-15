'use client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { INTERNAL_SERVER_ERROR } from '@/constants'

const Account = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Get a user from the database.
  useEffect(() => {
    // Mark the beginning of the hook.
    console.log('useEffect start')

    // A function that handles post request to the database.
    const handleDatabaseRequest = async () => {
      // Perform a request to load the user data from the database.
      try {
        const response = await fetch('/api/db/get_account_data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        // Validate the response.
        if (response.ok) {
          // Get the data.
          const responseUser = await response.json()

          // Log the received data.
          console.log(responseUser)

          // Set the user.
          setUser(responseUser)
        } else {
          // An error occurred.
          // Get the error.
          const errorData = await response.json()

          setError(errorData.message)
        } // end if
      } catch (err) {
        // Log the error.
        console.log(err)

        // An error occurred.
        setError(INTERNAL_SERVER_ERROR)
      } // end try-catch
    } // end function handleDatabaseRequest

    // Execute data fetching.
    handleDatabaseRequest()
  }, [])

  // If error, inform a user about it.
  if (error) {
    return <p>{error}</p>
  } // end if

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100">
        <Button
          variant="outline-secondary"
          style={{ margin: '3rem 0 0 3rem' }}
          className="btn btn-sm"
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <i className="bi bi-chevron-left"></i>
          </Link>
        </Button>
      </div>
      <img
        src="/api/db/get_profile_picture"
        width={150}
        height={150}
        style={{ borderRadius: '50%', marginTop: '3rem' }}
        alt="Profile picture"
      />
      <div className="d-flex flex-row justify-content-center align-items-center">
        <p className="fs-4 fw-bolder" style={{ margin: '1rem 0 1rem 0' }}>
          {user ? `${user.first_name} ${user.last_name}` : 'Name Surname'}
        </p>

        {/* Wrap the icon in a Link to make it redirect */}
        <Link href="/account/edit_profile" passHref>
          <i
            className="bi bi-pencil-square"
            style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
          ></i>
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <div
          className="text-center flex-grow-1"
          style={{ padding: '1rem', width: '10rem' }}
        >
          <p className="mb-1">Purchases</p>
          <p className="fw-bold">{user ? user.numOfPurchases : '0'}</p>
        </div>
        <div
          className="border-start"
          style={{ height: '5rem', width: '1px', backgroundColor: 'black' }}
        ></div>
        <div
          className="text-center flex-grow-1"
          style={{ padding: '1rem', width: '10rem' }}
        >
          <p className="mb-1">Sales</p>
          <p className="fw-bold">{user ? user.numOfSales : '0'}</p>
        </div>
      </div>
      <p className="fs-3 fw-bolder">Balance: {user ? user.balance : '0'}</p>
      <Link href="/sales">
        <Button
          variant="primary"
          style={{
            width: '80vw',
            maxWidth: '30rem',
            borderRadius: '20px',
            margin: '2rem 0 0 0'
          }}
        >
          Sales
        </Button>
      </Link>
      <Link href="/purchases">
        <Button
          variant="primary"
          style={{
            width: '80vw',
            maxWidth: '30rem',
            borderRadius: '20px',
            margin: '2rem 0 0 0'
          }}
        >
          Purchases
        </Button>
      </Link>
    </div>
  )
}

export default Account
