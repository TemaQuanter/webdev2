'use client'

import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
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
          toast.error(errorData.message)
        }
      } catch (err) {
        // An error occurred while making the API request.

        // Log the error.
        console.log(err)

        // Display error to the user.
        setError(err)
        toast.error('An error occurred while loading your cart.')
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

  // This function handles a purchase of the product.
  const handlePurchase = async (e) => {
    // Make sure that the total is greater than 0.
    if (getTotal() === 0) {
      return
    } // end if

    // Prevent the page from automatic reload.
    e.preventDefault()

    // Send a request to make a purchase.
    try {
      const response = await fetch('/api/db/make_purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({})
      })

      // Check if the response was successful.
      if (response.ok) {
        // The response was successful.

        // Notify the user about success using Toastify.
        toast.success('The purchase was completed successfully! Redirecting...')

        // Redirect the user to their account after a short delay (optional).
        setTimeout(() => {
          window.location.assign('/account')
        }, 250) // 0.25-second delay before redirecting
      } else {
        // Something went wrong.

        // Retrieve the error from the response.
        const errorData = await response.json()

        // Log the error.
        console.log(errorData.message)

        // Show the error to the user using Toastify.
        setError(errorData.message)
        toast.error(errorData.message)
      } // end if
    } catch (err) {
      // An error occurred while making a request.

      // Log the error.
      console.log(err)

      // Set the error and show it using Toastify.
      setError(err)
      toast.error('An error occurred during the purchase. Please try again.')
    } // end try-catch
  } // end function handlePurchase

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

              // Create query parameters using URLSearchParams.
              const params = new URLSearchParams({
                search: '',
                productUUId: cartItem.products.product_uuid
              })

              return (
                <div key={index}>
                  <a
                    href={`/products/product_view?${params}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ProductCard
                      title={cartItem.products.title}
                      description={cartItem.products.description}
                      sellerName={`${cartItem.products.users.first_name} ${cartItem.products.users.last_name}`}
                      price={cartItem.products.price}
                      imageUrl={imageUrl}
                    />
                  </a>

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
        <Button
          onClick={handlePurchase}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            fontWeight: 'bold',
            textDecoration: 'none',
            // transition: 'background-color 0.3s, color 0.3s',
            cursor: 'pointer',
            marginBottom: '3rem'
          }}
          variant="primary"
        >
          Purchase
        </Button>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Cart
