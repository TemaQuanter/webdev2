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

  // Button animations.
  const [isHovered, setIsHovered] = useState(-1)

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

          // Load the account data.
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
      {/* Heading with gradient and fade-in animation */}
      <Container
        fluid
        className="purchases-dashboard-section text-white py-5"
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          animation: 'fadeIn 2s ease-in-out'
        }}
      >
        <h1 className="text-center">
          Sales Dashboard -{' '}
          {account
            ? `${account.first_name} ${account.last_name}`
            : 'Valued User'}
        </h1>
      </Container>

      <ButtonBack href="/account" />

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Sales
          </p>
        </Container>
        <hr />
      </div>

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
                // Create query parameters using URLSearchParams.
                const params = new URLSearchParams({
                  productUUId: listedProduct.product_uuid
                })

                return (
                  <Link
                    href={`/account/edit_item?${params}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    key={index}
                  >
                    <div
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(-1)}
                      style={{
                        transform:
                          isHovered === index ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out',
                        cursor: 'pointer'
                      }}
                    >
                      <ProductCard
                        title={listedProduct.title}
                        sellerName={`${account.first_name} ${account.last_name}`}
                        description={listedProduct.description}
                        imageUrl={`/api/db/get_public_image?${new URLSearchParams({ imagePath: listedProduct.image_url })}`}
                        price={listedProduct.price}
                      />
                    </div>
                  </Link>
                )
              })
            : null}
        </div>
      </Container>

      {/* Keyframes for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Purchases
