'use client'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'
import { Row, Col, Container } from 'react-bootstrap'
import SimpleCard from '@/components/SimpleCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Pagination from 'react-bootstrap/Pagination'

const RESULT_LIMIT = 10

const Category = () => {
  const [products, setProducts] = useState([])
  const [sellers, setSellers] = useState([])
  const [error, setError] = useState(null)

  // Button animations.
  const [isHovered, setIsHovered] = useState(-1)

  // Get search parameters from the URL
  const searchParams = useSearchParams()

  // Access the 'categoryUUId' query parameter
  const categoryUUId = searchParams.get('categoryUUId')

  // Access the 'page' query parameter.
  const pageQuery = searchParams.get('page')

  // Retrieve the searched for products from the database.
  useEffect(() => {
    // Reset the errors.
    setError(null)

    // This function makes an api call to retrieve the product items.
    const handleProductSearch = async () => {
      // Make a request to retrieve the searched for products.
      try {
        const response = await fetch('/api/db/get_category_products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            categoryUUId: categoryUUId,
            resultLimit: RESULT_LIMIT,
            pageNumber: pageQuery
          })
        })

        // Check if the request was successful.
        if (response.ok) {
          // The products were successfully retrieved from the database.

          // Get the data.
          const data = await response.json()

          console.log(data)

          // Store the response.
          setProducts(data)
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
  }, []) // end useEffect

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Categories</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Placeholder Rectangle */}
      <div
        style={{
          width: '100%',
          height: '350px',
          backgroundColor: '#f0f0f0'
        }}
      ></div>

      <SimpleCard />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Products</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Products Section */}
      <Container fluid className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
            <ProductCard />
          </Col>
          <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
            <ProductCard />
          </Col>
          <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
            <ProductCard />
          </Col>
          <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
            <ProductCard />
          </Col>
        </Row>
      </Container>

      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ marginTop: '1rem' }}
      >
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
} // end function Category

export default Category
