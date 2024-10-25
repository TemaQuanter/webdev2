'use client'

import { useEffect, useState, Suspense } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonBack from '@/components/ButtonBack'
import { useSearchParams } from 'next/navigation'

const ItemEditing = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('')
  const [items, setItems] = useState(1)
  const [error, setError] = useState(null)

  const [imageUrl, setImageUrl] = useState(null)

  // Search parameters.
  const searchParams = useSearchParams()

  // Get product UUID from search parameters.
  const productUUId = searchParams.get('productUUId')

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
  }, []) // end useEffect

  // Load the current product data.
  useEffect(() => {
    console.log('useEffect started...')

    const handleDatabaseRequest = async () => {
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

        // Check if the request was executed successfully.
        if (response.ok) {
          // Get the response data.
          const data = await response.json()

          // Log the data.
          console.log(data)

          // Update the fields.
          setProductName(data.title)
          setDescription(data.description)
          setCategory(data.categories.category_uuid)
          setPrice(data.price)
          setItems(data.number_of_items)
          setImageUrl(data.image_url.replace('public/', '/'))
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
  }, []) // end useEffect

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
    formData.append('productUUId', productUUId)

    // Call an api to list the product.
    try {
      const response = await fetch('/api/db/update_item_data', {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })

      console.log(response)

      // Check if the response was successful.
      if (response.ok) {
        // The response was successful.
        // Redirect the user to sales page.
        // Do hard reload to update the state.
        setTimeout(() => {
          window.location.assign('/account/sales')
        }, 250)
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

      <h1 style={{ margin: '3rem 0 3rem 0' }}>Edit Item</h1>

      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}

      <img
        src={image ? URL.createObjectURL(image) : imageUrl}
        width={150}
        height={150}
        style={{
          width: '100%', // Make the image responsive
          maxWidth: '150px', // Cap the image size to 150px
          aspectRatio: '1', // Keep the image square
          backgroundColor: '#d3d3d3',
          marginBottom: '3rem',
          objectFit: 'cover'
        }}
        alt="Product image"
      />

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
              ? allCategories.map((singleCategory, index) => (
                  <option value={singleCategory.category_uuid} key={index}>
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
            min={0}
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
          Save changes
        </Button>
      </Form>
    </div>
  )
}

const ItemEditingWrapper = () => {
  return (
    <Suspense fallback={<div>Loading item data...</div>}>
      <ItemEditing />
    </Suspense>
  )
}

export default ItemEditingWrapper
