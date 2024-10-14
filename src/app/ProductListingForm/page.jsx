'use client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ProductListing = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('')
  const [items, setItems] = useState(1)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Reset any previous error messages
    setError(null)

    // Check if the image exceeds 10MB in size
    if (image && image.size > 10485760) {
      setError('Image size exceeds 10MB limit.')
      return
    }

    // Simulate success message after form submission
    alert('Form submitted successfully!')

    // Reset form values to empty/initial state after submission
    setProductName('')
    setDescription('')
    setCategory('')
    setImage(null)
    setPrice('')
    setItems(1)
  }

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <h1>List a Product</h1>

      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}

      <Form
        className="w-100"
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
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
            <option value="category4">Category 4</option>
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
          style={{ borderRadius: '20px' }}
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
