'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const Refresh = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  console.log('Refresh page triggered')

  useEffect(() => {
    const refreshTokens = async () => {
      // Get a response from refresh api.
      const response = await fetch('/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {}
      })

      console.log(response)

      // Check if the response was received successfully.
      if (response.ok) {
        // Response was successful.
        // Redirect the client to the requested address.
        router.replace(searchParams.get('redirectTo'))
      } else {
        // An error occurred.
        // Redirect to the login page.
        router.replace('/sign_in')
      } // end if
    } // end function refreshTokens

    refreshTokens()
  }, [router, searchParams])
  return <p>Refreshing the session...</p>
} // end function Refresh

export default Refresh
