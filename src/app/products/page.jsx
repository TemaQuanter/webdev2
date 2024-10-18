'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'
import Pagination from 'react-bootstrap/Pagination'
import { useSearchParams } from 'next/navigation'

const RESULT_LIMIT = 10

const Products = () => {
  const [products, setProducts] = useState([])
  const [sellers, setSellers] = useState([])
  const [error, setError] = useState(null)

  // Get search parameters from the URL
  const searchParams = useSearchParams()

  // Access the 'search' query parameter
  const searchQuery = searchParams.get('search')

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
        const response = await fetch('/api/db/get_search_results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            productSearchText: searchQuery,
            resultLimit: RESULT_LIMIT,
            pageNumber: pageQuery
          })
        })

        // Check if the request was successful.
        if (response.ok) {
          // The products were successfully retrieved from the database.

          // Get the data.
          const data = await response.json()

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
  }, [])

  // Retrieve the seller information for the products.
  useEffect(() => {
    // Reset the errors.
    setError(null)

    // This function makes an api call to retrieve the product items.
    const handleSellerSearch = async () => {
      // Make a request to retrieve the searched for products.
      try {
        const sellerRequests = products.map(async (product) => {
          const response = await fetch('/api/db/get_public_user_data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              user_uuid: product.seller_uuid
            })
          })

          // Check if the request was successful.
          if (response.ok) {
            // The products were successfully retrieved from the database.
            // Return a promise with data retrieval.
            return response.json()
          } else {
            // The response is an error.
            const errorData = await response.json()

            // Throw an error.
            throw new Error(errorData.message)
          } // end if
        }) // end map

        // Wait for all requests to complete
        const sellersData = await Promise.all(sellerRequests)

        // Store all the seller information
        setSellers(sellersData)
      } catch (err) {
        // An error occurred while requesting the data.

        // Log the error.
        console.log(err)

        // Display the error to the user.
        setError(err)
      } // end try-catch
    } // end function handleSellerSearch

    // Call the request handler if the product were found.
    if (products.length > 0) {
      handleSellerSearch()
    } // end if
  }, [products])

  return (
    <>
      <Header searchBarText={searchQuery} /> {/* Include the header */}
      <h1 className="fs-4 text-center" style={{ margin: '1rem 0 1rem 0' }}>
        Search result:
      </h1>
      {/* Error message displayed if there is an error */}
      {error && <p className="text-danger">{error}</p>}
      <div
        className="mx-auto d-flex flex-column"
        style={{ maxWidth: '85%', gap: '3rem' }}
      >
        {/* Conditionally render the list only when on the client and when products are loaded */}
        {products.length === sellers.length &&
          products.map((productItem, index) => {
            // Get image URL for the product.
            const imageUrl = productItem.image_url.replace('public/', '/')

            return (
              <ProductCard
                title={productItem.title}
                description={productItem.description}
                imageUrl={imageUrl}
                sellerName={`${sellers[index].first_name} ${sellers[index].last_name}`}
                price={productItem.price}
              />
            )
          })}
      </div>
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
      <Footer /> {/* Include the footer */}
    </>
  )
}

export default Products
