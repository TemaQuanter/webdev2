'use client'

import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

import ProductCard from '@/components/ProductCard'
import ButtonBack from '@/components/ButtonBack'

const Purchases = () => {
  const [listedProducts, setListedProducts] = useState([])
  const [error, setError] = useState(null)
  const [account, setAccount] = useState(null)

  // Load the listed products.
  useEffect(() => {
    console.log('useEffect started...')

    // Reset the error.
    setError(null)

    // Handle a request to load the listed items.
    const handleLoadListedItems = async () => {
      // Make a request to the listed items API.
      try {
        const response = await fetch('/api/db/get_listed_items', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // Check the response.
        if (response.ok) {
          // The response was successful.

          // Retrieved the data.
          const data = await response.json()

          // Log the retrieved data.
          console.log(data)

          // Load the listed items.
          setListedProducts(data)
        }
      } catch (err) {
        // An error occurred while retrieving the data.

        // Log the error.
        console.log(err)

        // Display the error to the user.
        setError(err)
      } // end try-catch

      // Make a request to get the user data.
      try {
        const response = await fetch('/api/db/get_account_data', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // Check the response.
        if (response.ok) {
          // The response was successful.

          // Retrieved the data.
          const data = await response.json()

          // Log the retrieved data.
          console.log(data)

          // Load the listed items.
          setAccount(data)
        }
      } catch (err) {
        // An error occurred while retrieving the data.

        // Log the error.
        console.log(err)

        // Display the error to the user.
        setError(err)
      } // end try-catch
    } // end function handleLoadListedItems

    // Execute the load listing items function.
    handleLoadListedItems()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <ButtonBack href="/account" />

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Sales
          </p>
          {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      <p className="fs-5 fw-bolder">Total income:</p>
      <p className="fs-4 fw-bolder">269 Euro</p>

      <Link href="/account/product_listing_form">
        <Button
          variant="primary"
          style={{ width: '40vw', maxWidth: '30rem', borderRadius: '20px' }}
        >
          <i
            className="bi bi-plus-circle-fill"
            style={{ marginRight: '1rem' }}
          ></i>
          List an item
        </Button>
      </Link>

      <Link href="/account/sales_history" style={{ marginTop: '1rem' }}>
        Sales history
      </Link>

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Listed items:
          </p>
          {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      {/* Container for product cards */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto d-flex flex-column"
          style={{ maxWidth: '85%', gap: '3rem' }}
        >
          {listedProducts && account
            ? listedProducts.map((listedProduct, index) => {
                // Remove 'public' from the UR
                const imagePath = listedProduct.image_url.replace(
                  'public/',
                  '/'
                )
                return (
                  <ProductCard
                    title={listedProduct.title}
                    sellerName={`${account.first_name} ${account.last_name}`}
                    description={listedProduct.description}
                    imageUrl={imagePath}
                    price={listedProduct.price}
                  />
                )
              })
            : null}
        </div>
      </Container>
    </div>
  )
}

export default Purchases
