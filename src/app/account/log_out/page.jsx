'use client'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import Toastify CSS

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Send a query to log out the user.
  useEffect(() => {
    console.log('Effect started')

    const handleLogout = async () => {
      try {
        console.log('Starting the logout process...')

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
          // User logged out successfully, show success toast
          toast.success('Logout successful! Redirecting to home...')

          // Redirect after a short delay to allow the user to see the toast
          setTimeout(() => {
            window.location.assign('/')
          }, 250) // .25-second delay
        } else {
          // Failed to log out, show error toast
          toast.error('Failed to log out. Please try again.')
        } // end if
      } catch (error) {
        console.error('Error during the logout process:', error)
        // Show a generic error toast
        toast.error('An error occurred during logout. Please try again.')
      } finally {
        setIsLoading(false)
      } // end try-catch
    }

    // Log out the user.
    handleLogout()
  }, [])

  if (isLoading) {
    return <p>Logging out...</p>
  } // end if

  return (
    <div>
      <p>Something went wrong, please try reloading the page.</p>

      {/* Add ToastContainer to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  )
} // end function Logout

export default Logout
