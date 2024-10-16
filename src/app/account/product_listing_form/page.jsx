'use client'

import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonBack from '@/components/ButtonBack'

const ProductListing = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('')
  const [items, setItems] = useState(1)
  const [error, setError] = useState(null)

  // These categories will be loaded from the database.
  const [allCategories, setAllCategories] = useState(null)

  // Load the available categories from the database.
  useEffect(() => {
    console.log('useEffect started...')

    const handleDatabaseRequest = async () => {
      try {
        const response = await fetch('/api/db/get_product_categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // Check if the request was executed successfully.
        if (response.ok) {
          // Get the response data.
          const data = await response.json()

          // Log the data.
          console.log(data)

          // Update the categories.
          setAllCategories(data)
        } else {
          // An error occurred while retrieving the categories.

          // Get the error data.
          const errorData = await response.json()

          // Log the error.
          console.log(errorData.message)

          // Display the error to the user.
          setError(errorData.message)
        } // end if
      } catch (err) {
        // An error occurred while retrieving the categories.

        // Log the error.
        console.log(err)

        // Display the error to the user.
        // setError(err)
      } // end try-catch
    } // end handleDatabaseRequest.

    // Call the function to execute the request.
    handleDatabaseRequest()
  }, [])

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault()

    // Reset any previous error messages
    setError(null)

    // Check if the image exceeds 10MB in size
    if (image && image.size > 10485760) {
      setError('Image size exceeds 10MB limit.')
      return
    } // end if

    // Create a submission form.
    const formData = new FormData()

    formData.append('productTitle', productName)
    formData.append('productDescription', description)
    formData.append('productCategory', category)
    formData.append('productImage', image)
    formData.append('productPrice', price)
    formData.append('numberOfItems', items)

    // Call an api to list the product.
    try {
      const response = await fetch('/api/db/list_item', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      console.log(response)

      // Check if the response was successful.
      if (response.ok) {
        // The response was successful.
        // Redirect the user to sales page.
        // Do hard reload to update the state.
        window.location.href = '/account/sales'
      } else {
        // An error occurred.

        // Get the error.
        const errorData = await response.json()

        // Log the error.
        console.log(errorData.message)

        // Display the error to the user.
        setError(errorData.message)
      } // end if
    } catch (err) {
      // Something went wrong.

      // Log the error.
      console.log(err)

      // Display the error to the user.
      setError(err)
    } // end try-catch
  } // end function handleSubmit

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <ButtonBack href="/account/sales" />

      <h1 style={{ margin: '3rem 0 3rem 0' }}>List a Product</h1>

      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}

      <Form
        className="w-80"
        style={{ maxWidth: '30rem' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {allCategories
              ? allCategories.map((singleCategory) => (
                  <option
                    value={singleCategory.category_id}
                    key={singleCategory.category_id}
                  >
                    {singleCategory.name}
                  </option>
                ))
              : null}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Items for Sale</Form.Label>
          <Form.Control
            type="number"
            min={1}
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
          Submit Product
        </Button>
      </Form>
    </div>
  )
}

export default ProductListing
