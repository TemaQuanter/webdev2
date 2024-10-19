'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'next/navigation'

const RESULT_LIMIT = 10

const Products = () => {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  // Number of items to purchase.
  const [items, setItems] = useState(1)

  // Get search parameters from the URL
  const searchParams = useSearchParams()

  // Access the 'search' query parameter
  const searchQuery = searchParams.get('search')

  // Access the 'productUUId' query parameter.
  const productUUId = searchParams.get('productUUId')

  // Retrieve the searched for products from the database.
  useEffect(() => {
    // Reset the errors.
    setError(null)

    // This function makes an api call to retrieve the product items.
    const handleProductSearch = async () => {
      // Make a request to retrieve the searched for products.
      try {
        const response = await fetch('/api/db/get_product_public_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            product_uuid: productUUId
          })
        })

        // Check if the request was successful.
        if (response.ok) {
          // The products were successfully retrieved from the database.

          // Get the data.
          const data = await response.json()

          // Log the data.
          console.log(data)

          // Get a correct image URL.
          setImageUrl(data.image_url.replace('public/', '/'))

          // Store the response.
          setProduct(data)
        } else {
          // The response is an error.

          // Retrieve the error information.
          const errorData = await response.json()

          // Display the error.
          console.log(errorData.message)

          // Show the error to the user.
          setError(errorData.message)
        } // end if
      } catch (err) {
        // An error occurred while retrieving the products.

        // Log the error.
        console.log(err)

        // Display the error to the user.
        setError(err)
      } // end try-catch
    } // end function handleProductSearch

    // Call the request handler.
    handleProductSearch()
  }, [])

  const handleAddToCart = async (e) => {
    // This prevent the page from instant reload on form
    // submission.
    e.preventDefault()

    // Reset errors.
    setError(null)

    // Make a request to an API to add a product to the cart.
    try {
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

      // Check if the request was successful.
      if (response.ok) {
        // Response was successful.

        // Tell a user about that.
        alert('The product was successfully added to a cart')

        // Redirect the user to the the cart.
        window.location.href = '/account/cart'
      } else {
        // An error occurred.

        // Get the error.
        const errorData = await response.json()

        // Log the error.
        console.log(errorData.message)

        // Show the error message to the user.
        setError(errorData.message)
      } // end if
    } catch (err) {
      // Log the error.
      console.log(err)

      // Display the error to the user.
      setError(err)
    } // end try-catch
  } // end function handleAddToCart

  return (
    <>
      <Header searchBarText={searchQuery} /> {/* Include the header */}
      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}
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
            {/* Conditionally render the list only when on the client and when products are loaded */}
            <ProductCard
              title={product.title}
              description={product.description}
              imageUrl={imageUrl}
              sellerName={`${product.users.first_name} ${product.users.last_name}`}
              price={product.price}
            />
          </div>
          {/* Number of items available in stock */}
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
              min={1}
              max={product ? Math.max(product.number_of_items, 1) : 1}
              value={items}
              onChange={(e) => setItems(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            style={{ borderRadius: '20px', margin: '3rem 0 3rem 0' }}
            className="w-100"
            variant="primary"
            type="submit"
          >
            Add to cart
          </Button>
        </Form>
      </div>
      <Footer /> {/* Include the footer */}
    </>
  )
} // end function Products

export default Products
