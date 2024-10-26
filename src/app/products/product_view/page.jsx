'use client'

import { useEffect, useState, Suspense } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RESULT_LIMIT = 10

const Products = () => {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [items, setItems] = useState(1)

  // Get search parameters from the URL
  const searchParams = useSearchParams()

  // Access the 'search' query parameter
  const searchQuery = searchParams.get('search')

  // Access the 'productUUId' query parameter
  const productUUId = searchParams.get('productUUId')

  // Retrieve the searched products from the database
  useEffect(() => {
    // Reset any previous error
    setError(null)

    // Function to handle product search API request
    const handleProductSearch = async () => {
      try {
        // Make a POST request to fetch product data
        const response = await fetch('/api/db/get_product_public_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ product_uuid: productUUId })
        })

        // Check if the request was successful
        if (response.ok) {
          const data = await response.json()

          // Set the image URL and product data
          setImageUrl(data.image_url.replace('public/', '/'))
          setProduct(data)
        } else {
          // Handle response errors
          const errorData = await response.json()
          setError(errorData.message)
        }
      } catch (err) {
        // Handle any other errors
        setError(err)
      }
    }

    // Execute the product search function
    handleProductSearch()
  }, [productUUId])

  // Load the current number of items in the user cart.
  useEffect(() => {
    console.log('useEffect cart check started...')
    // Reset any previous error
    setError(null)

    // Function to handle product search API request
    const handleCartSearch = async () => {
      try {
        // Make a POST request to fetch product data
        const response = await fetch('/api/db/get_cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        // If the user is not authorized, then don't do anything.
        if (response.status === 401) {
          return
        } // end if

        // Check if the request was successful
        if (response.ok) {
          const data = await response.json()

          console.log(data)
          console.log('Checking products')

          let numItems = 0

          // Find the product with the required UUID and get the
          // number of items in the user's cart.
          for (const curProduct of data) {
            // Check if the current product is the product searched for.
            if (curProduct.products.product_uuid === productUUId) {
              // The product is found.
              // Set the number of items in the cart.
              numItems = curProduct.number_of_items

              // Exit the loop immediately.
              break
            } // end if
          } // end for

          // Set the Number of items in the user's cart
          setItems(numItems)
        } else {
          // Handle response errors
          const errorData = await response.json()
          setError(errorData.message)
        }
      } catch (err) {
        // Handle any other errors
        setError(err)
      } // end try-catch
    } // end function handleCartSearch

    // Execute the cart search function
    handleCartSearch()
  }, [product])

  // Function to handle adding product to cart
  const handleAddToCart = async (e) => {
    // Prevent page reload on form submission
    e.preventDefault()

    // Reset previous error
    setError(null)

    try {
      // Make a POST request to add product to the cart
      const response = await fetch('/api/db/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          productUUId: product.product_uuid,
          numberOfItems: items
        })
      })

      // Check if the request was successful
      if (response.ok) {
        // Show success message using Toastify
        toast.success('Product successfully added to cart! Redirecting...')

        // Redirect to cart page after a short delay (250ms)
        setTimeout(() => {
          window.location.assign('/account/cart')
        }, 250)
      } else {
        // Handle response errors
        const errorData = await response.json()
        setError(errorData.message)
        toast.error(errorData.message)
      }
    } catch (err) {
      // Handle any other errors
      setError(err)
      toast.error('An error occurred while adding to cart.')
    }
  }

  return (
    <>
      {/* Include the header component */}
      <Header searchBarText={searchQuery} />

      {/* Display the product information */}
      {product && (
        <div>
          <h1 className="fs-4 text-center" style={{ margin: '1rem 0 1rem 0' }}>
            {product.title}
          </h1>
          <p className="fs-5 text-center" style={{ marginTop: '1rem' }}>
            Category: {product.categories.name}
          </p>

          <div
            className="mx-auto d-flex flex-column"
            style={{ maxWidth: '85%', gap: '3rem' }}
          >
            {/* Render the ProductCard component */}
            <ProductCard
              title={product.title}
              description={product.description}
              imageUrl={`/api/db/get_public_image?${new URLSearchParams({ imagePath: product.image_url })}`}
              sellerName={`${product.users.first_name} ${product.users.last_name}`}
              price={product.price}
            />
          </div>

          {/* Display stock information */}
          {product.number_of_items > 0 ? (
            <p
              className="fs-4 text-success text-center"
              style={{ marginTop: '1rem' }}
            >
              In stock: {product.number_of_items}
            </p>
          ) : (
            <p
              className="fs-4 text-danger text-center"
              style={{ marginTop: '1rem' }}
            >
              Out of stock
            </p>
          )}
        </div>
      )}

      {/* Form to add the product to the cart */}
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ marginTop: '2rem' }}
      >
        <Form
          className="w-80"
          style={{ maxWidth: '30rem' }}
          onSubmit={handleAddToCart}
        >
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={product ? Math.max(product.number_of_items, 1) : 0}
              value={items}
              onChange={(e) => setItems(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            style={{ borderRadius: '20px', margin: '3rem 0 3rem 0' }}
            className="w-100"
            variant={items > 0 ? 'primary' : 'danger'}
            type="submit"
          >
            {items > 0 ? 'Add to cart' : 'Delete from cart'}
          </Button>
        </Form>
      </div>

      {/* Include the footer component */}
      <Footer />

      {/* Toastify container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />
    </>
  )
}

const ProductsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading products data...</div>}>
      <Products />
    </Suspense>
  )
}

export default ProductsWrapper
