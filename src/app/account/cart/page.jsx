'use client'

import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'

const Purchase = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [cart, setCart] = useState([])
  const [error, setError] = useState(null)

  // Load the user cart content.
  useEffect(() => {
    console.log('useEffect started...')

    // Reset the error.
    setError(null)

    // This function makes an API request to retrieve cart information.
    const handleCartIntoRequest = async () => {
      try {
        // Make an API call to retrieve the cart information.
        const response = await fetch('/api/db/get_cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        // Check if the request was successful.
        if (response.ok) {
          // The response was successful.

          // Load the data.
          const data = await response.json()

          // Set the cart.
          setCart(data)
        } else {
          // An error occurred.

          // Retrieve the error data.
          const errorData = await response.json()

          // Log the error.
          console.log(errorData.message)

          // Display the error to the user.
          setError(errorData.message)
        }
      } catch (err) {
        // An error occurred while making the API request.

        // Log the error.
        console.log(err)

        // Display error to the user.
        setError(err)
      } // end try-catch
    } // end handleCartInfoRequest

    // Run the request.
    handleCartIntoRequest()
  }, []) // end useEffect

  // This function calculates the total price of the cart.
  const getTotal = () => {
    let totalPrice = 0

    // Calculate the total price.
    cart.map((cartItem, index) => {
      totalPrice +=
        Number(cartItem.products.price) * Number(cartItem.number_of_items)
    })

    return totalPrice.toFixed(2)
  } // end function getTotal

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Cart</h3> {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      {/* First Container for ProductCard */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto d-flex flex-column"
          style={{ maxWidth: '85%', gap: '5rem' }}
        >
          {cart &&
            cart.map((cartItem, index) => {
              // Extract an image URL.
              const imageUrl = cartItem.products.image_url.replace(
                'public/',
                '/'
              )

              return (
                <div>
                  <ProductCard
                    title={cartItem.products.title}
                    description={cartItem.products.description}
                    sellerName={`${cartItem.products.users.first_name} ${cartItem.products.users.last_name}`}
                    price={cartItem.products.price}
                    imageUrl={imageUrl}
                  />

                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '1rem'
                    }}
                  >
                    <strong>x{cartItem.number_of_items}</strong>
                  </div>
                </div>
              )
            })}
        </div>
        <div
          style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5rem' }}
        >
          <strong>Total</strong>
        </div>
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '1.5rem'
          }}
        >
          {cart && <strong>EUR {getTotal()}</strong>}
        </div>
      </Container>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            border: isHovered ? '1px solid #007bff' : '1px solid transparent',
            fontWeight: 'bold',
            backgroundColor: isHovered ? '#007bff' : 'aliceblue',
            color: isHovered ? 'white' : '#007bff',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
            cursor: 'pointer',
            marginBottom: '3rem'
          }}
        >
          Purchase
        </button>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Purchase
