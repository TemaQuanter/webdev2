'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const Refresh = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log('Effect started')

    const handleAuthentication = async () => {
      try {
        console.log('Starting the refresh process...')

        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({})
        })

        console.log('API response:', response)
        console.log('Response status:', response.status)

        if (response.ok) {
          const redirectTo = searchParams.get('redirectTo') || '/account'
          console.log('Setting redirect path to:', redirectTo)
          // Force a full page reload to ensure cookies are set and state is correct.
          window.location.href = '/account'
        } else {
          console.error('Failed to refresh token. Redirecting to sign-in page.')
          router.replace('/sign_in')
        }
      } catch (error) {
        console.error('Error during the refresh process:', error)
        router.replace('/sign_in')
      } finally {
        setIsLoading(false)
      }
    }

    handleAuthentication()
  }, [searchParams]) // Include only relevant dependencies

  if (isLoading) {
    return <p>Refreshing the session...</p>
  }

  return <p>Something went wrong, please try reloading the page.</p>
}

export default Refresh
