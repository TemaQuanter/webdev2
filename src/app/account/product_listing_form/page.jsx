'use client'

import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonBack from '@/components/ButtonBack'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductListing = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('')
  const [items, setItems] = useState(1)
  const [allCategories, setAllCategories] = useState(null)

  // Load the available categories from the database.
  useEffect(() => {
    const handleDatabaseRequest = async () => {
      try {
        const response = await fetch('/api/db/get_product_categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setAllCategories(data)
        } else {
          const errorData = await response.json()
          toast.error(`Error loading categories: ${errorData.message}`)
        }
      } catch (err) {
        toast.error('Error loading categories. Please try again later.')
      }
    }

    handleDatabaseRequest()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the image exceeds 10MB in size
    if (image && image.size > 10485760) {
      toast.error('Image size exceeds 10MB limit.')
      return
    }

    const formData = new FormData()
    formData.append('productTitle', productName)
    formData.append('productDescription', description)
    formData.append('productCategory', category)
    formData.append('productImage', image)
    formData.append('productPrice', price)
    formData.append('numberOfItems', items)

    try {
      const response = await fetch('/api/db/list_item', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (response.ok) {
        // Show success toast and redirect after 0.5 seconds (500ms)
        toast.success('Product listed successfully! Redirecting...')
        setTimeout(() => {
          window.location.assign('/account/sales')
        }, 250) // 250ms delay
      } else {
        const errorData = await response.json()
        toast.error(`Error listing product: ${errorData.message}`)
      }
    } catch (err) {
      toast.error('Error listing product. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-light d-flex flex-column justify-content-center align-items-center">
      <ButtonBack href="/account/sales" />

      <h1 style={{ margin: '3rem 0 3rem 0' }}>List a Product</h1>

      <img
        src={image && URL.createObjectURL(image)}
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

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />
    </div>
  )
}

export default ProductListing
