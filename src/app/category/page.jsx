'use client'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'
import { Row, Col, Container } from 'react-bootstrap'
import SimpleCard from '@/components/SimpleCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

import Pagination from 'react-bootstrap/Pagination'

const RESULT_LIMIT = 10

const Category = () => {
  const [category, setCategory] = useState(null)
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
          setCategory(data)
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

  const loadPage = (pageToLoad) => {
    // Create query parameters using URLSearchParams.
    const params = new URLSearchParams({
      categoryUUId: categoryUUId,
      page: pageToLoad
    })

    // Load the page.
    setTimeout(() => {
      window.location.assign(`/category?${params}`)
    }, 250)
  } // end function loadPage

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Category Heading */}
      <div
        className="category-heading bg-light py-5" // Increase padding for more space around heading
        style={{
          backgroundColor: '#f8f9fa', // Optional: change background color if needed
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
          borderRadius: '8px', // Rounded corners for a softer look
          textAlign: 'center' // Center align the heading
        }}
      >
        <Container>
          <h2
            className="text-dark" // Adjust text color as needed
            style={{
              fontSize: '1.5rem', // Larger font size for the heading
              fontWeight: '700', // Make the heading bold
              letterSpacing: '1px', // Slight letter spacing for readability
              textTransform: 'uppercase', // Optional: make heading uppercase
              marginBottom: '0' // Remove bottom margin if needed
            }}
          >
            Browse
          </h2>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#6c757d',
              marginTop: '0.5rem'
            }}
          >
            Explore our latest collection of products{' '}
            {/* Optional: Add a description or subheading */}
          </p>
        </Container>
      </div>

      <div
        className="responsive-banner"
        style={{
          backgroundImage: `url(${
            category ? category.banner_url : '/images/banners/banner1.png'
          })`
        }}
      ></div>

      <SimpleCard
        title={category ? category.name : 'Category'}
        description={category ? category.category_motto : 'Category motto'}
      />

      {/* Products Heading */}
      <div
        className="products-heading py-5" // Increased padding for more spacing
        style={{
          backgroundColor: '#ffffff', // Clean white background for simplicity
          display: 'flex',
          justifyContent: 'center', // Center the heading within the container
          alignItems: 'center',
          marginBottom: '2rem' // Adds space after the heading
        }}
      >
        <Container>
          <h3
            className="text-dark" // Dark color for a clean look
            style={{
              fontSize: '1.5rem', // Large font size for a bold statement
              fontWeight: '800', // Very bold font weight
              letterSpacing: '0.1rem', // Subtle letter spacing for a modern touch
              textTransform: 'uppercase', // Make the word uppercase for strong emphasis
              borderBottom: '5px solid #007bff', // Thin bottom border for the text itself
              display: 'inline-block', // Ensures the border sticks to the word
              paddingBottom: '0.5rem' // Padding to give space between text and underline
            }}
          >
            Products
          </h3>
        </Container>
      </div>

      {/* Products Section */}
      <Container fluid className="my-4">
        <Row className="justify-content-center">
          {category &&
            category.products.map((product, index) => {
              // Create query parameters using URLSearchParams.
              const params = new URLSearchParams({
                search: '',
                productUUId: product.product_uuid
              })

              return (
                <Col
                  xs={12}
                  sm={11}
                  md={10}
                  lg={9}
                  className="mb-4"
                  key={index}
                >
                  <a
                    href={`/products/product_view?${params}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ProductCard
                      title={product.title}
                      description={product.description}
                      sellerName={`${product.seller_first_name} ${product.seller_last_name}`}
                      price={product.price}
                      imageUrl={`/api/db/get_public_image?${new URLSearchParams({ imagePath: product.image_url })}`}
                    />
                  </a>
                </Col>
              )
            })}
        </Row>
      </Container>

      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ marginTop: '1rem' }}
      >
        <Pagination>
          <Pagination.First onClick={() => loadPage(1)} />
          <Pagination.Prev
            onClick={() => loadPage(Math.max(Number(pageQuery) - 1, 1))}
          />
          <Pagination.Item>{pageQuery}</Pagination.Item>
          <Pagination.Next onClick={() => loadPage(Number(pageQuery) + 1)} />
        </Pagination>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
} // end function Category

const CategoryWrapper = () => {
  return (
    <Suspense fallback={<div>Loading category data...</div>}>
      <Category />
    </Suspense>
  )
}

export default CategoryWrapper
