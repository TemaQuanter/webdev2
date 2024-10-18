'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const HINTS_NUMBER_LIMIT = 5
const PAGE_NUMBER = 1

const SearchBar = () => {
  const [productSearchText, setProductSearchText] = useState('')
  const [productSearchResults, setProductSearchResults] = useState([])
  const [isActiveSearchBar, setIsActiveSearchBar] = useState(false)

  // Update the search results when a user changes their input.
  useEffect(() => {
    console.log('useEffect search started...')

    // A function that handles database requests.
    const handleDatabaseRequest = async () => {
      // Try to search for the item in the database.
      try {
        const response = await fetch('/api/db/get_search_results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productSearchText: productSearchText,
            hintsNumberLimit: HINTS_NUMBER_LIMIT,
            pageNumber: PAGE_NUMBER
          })
        })

        // Check if the response was successful.
        if (response.ok) {
          // The response was successful.

          // Get the response data.
          const data = await response.json()

          console.log(data)

          // Set product search results.
          setProductSearchResults(data)
        } else {
          // The search failed.

          // Get the error.
          const errorData = await response.json()

          // Log the error.
          console.log(errorData.message)
        } // end if
      } catch (err) {
        // An error occurred.
        // Log the error.
        console.log(err)
      } // end catch
    } // end function handleDatabaseRequest

    // Perform a database search.
    handleDatabaseRequest()
  }, [productSearchText])

  return (
    <div
      style={{
        width: '80vw',
        margin: '0 auto'
      }}
    >
      <Form
        className="d-flex align-items-center flex-column"
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
          position: 'relative'
        }}
      >
        <InputGroup className="d-flex align-items-center">
          <Form.Control
            type="search"
            placeholder="Search for products"
            aria-label="Search"
            value={productSearchText}
            onChange={(e) => setProductSearchText(e.target.value)}
            onFocus={() => setIsActiveSearchBar(true)}
            onBlur={() => setIsActiveSearchBar(false)}
            style={{ borderRadius: '1.25rem', marginRight: '1rem' }} // Extra margin for space between input and button
          />
          <Button
            type="submit"
            variant="primary"
            style={{
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0',
              minWidth: '2.5rem', // Ensure width doesn't get adjusted by flex or other layouts
              minHeight: '2.5rem' // Ensure height stays equal to width
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>

        {/* Display search results under the search input */}
        {isActiveSearchBar && productSearchResults && (
          <ul
            style={{
              position: 'absolute',
              top: '2rem',
              left: '0',
              width: 'calc(100% - 3.5rem)', // Full width under the input
              backgroundColor: 'white', // White background
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              zIndex: 10, // Ensure it's above other elements
              paddingLeft: '0',
              marginTop: '0.5rem',
              listStyleType: 'none',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {productSearchResults.map((element, index) => (
              <li
                key={index}
                style={{
                  padding: '0.5rem 1rem',
                  borderBottom: '1px solid #ccc',
                  color: 'black', // Black text color
                  cursor: 'pointer'
                }}
                onMouseDown={() => {
                  // Handle click without triggering blur
                  setProductSearchText(element.title)
                }}
              >
                <b>{element.title}</b> <i>{element.description}</i>
              </li>
            ))}
          </ul>
        )}
      </Form>
    </div>
  )
}

export default SearchBar
