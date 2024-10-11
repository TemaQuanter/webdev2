'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const Refresh = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [redirectPath, setRedirectPath] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
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
          setRedirectPath(redirectTo) // Update state to trigger redirect outside of async function
        } else {
          console.error('Failed to refresh token. Redirecting to sign-in page.')
          setRedirectPath('/sign_in') // Update state to trigger redirect to sign-in
        }
      } catch (error) {
        console.error('Error during the refresh process:', error)
        setRedirectPath('/sign_in') // Update state to trigger redirect to sign-in
      } finally {
        setIsLoading(false)
      }
    }

    handleAuthentication()
  }, [searchParams])

  // Redirect outside of async function when redirectPath is updated
  useEffect(() => {
    if (redirectPath) {
      console.log('Redirecting to:', redirectPath)
      router.replace(redirectPath)
      console.log('After redirection')
    }
  }, [redirectPath]) // This useEffect runs when `redirectPath` state is set

  // If the refresh process is ongoing, show the message
  if (isLoading) {
    return <p>Refreshing the session...</p>
  }

  // Fallback in case the refresh logic fails to display anything
  return <p>Something went wrong, please try reloading the page.</p>
}

export default function WrappedRefresh() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Refresh />
    </Suspense>
  )
}
