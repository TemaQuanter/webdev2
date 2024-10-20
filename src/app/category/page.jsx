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
    window.location.href = `/category?${params}`
  } // end function loadPage

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Category</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Placeholder Rectangle */}
      <div
        style={{
          width: '100%',
          height: '350px',
          backgroundImage: `url(${
            category ? category.banner_url : '/images/banner1.png'
          })`
        }}
      ></div>

      <SimpleCard
        title={category ? category.name : 'Category'}
        description={category ? category.category_motto : 'Category motto'}
      />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Products</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Products Section */}
      <Container fluid className="my-4">
        <Row className="justify-content-center">
          {category &&
            category.products.map((product, index) => {
              // Get a valid product image URL.
              const imageUrl = product.image_url.replace('public/', '/')

              // Create query parameters using URLSearchParams.
              const params = new URLSearchParams({
                search: '',
                productUUId: product.product_uuid
              })

              return (
                <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
                  <a
                    href={`/products/product_view?${params}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ProductCard
                      title={product.title}
                      description={product.description}
                      sellerName={`${product.seller_first_name} ${product.seller_last_name}`}
                      price={product.price}
                      imageUrl={imageUrl}
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

export default Category
