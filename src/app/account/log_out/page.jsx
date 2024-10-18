/*
    This endpoint logs out the user.
*/

'use client'

import { useState, useEffect } from 'react'

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Send a query to log out the user.
  useEffect(() => {
    console.log('Effect started')

    const handleLogout = async () => {
      try {
        console.log('Starting the refresh process...')

        const response = await fetch('/api/auth/log_out', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({})
        })

        console.log('API response:', response)
        console.log('Response status:', response.status)

        // Check if the response was successful.
        if (response.ok) {
          // User logged out successfully, redirect them to the main page.
          // Force a full page reload to ensure cookies are set and state is correct.
          window.location.href = '/'
        } else {
          console.error('Failed to log out.')
        } // end if
      } catch (error) {
        console.error('Error during the refresh process:', error)
      } finally {
        setIsLoading(false)
      } // end try-catch
    }

    // Log out the user.
    handleLogout()
  }, [])

  if (isLoading) {
    return <p>Login out...</p>
  } // end if

  return <p>Something went wrong, please try reloading the page.</p>
} // end function Logout

export default Logout
