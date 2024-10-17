'use client'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const SearchBar = () => {
  const [productSearchText, setProductSearchText] = useState('')
  const [productSearchResults, setProductSearchResults] = useState([])

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
            productSearchText: productSearchText
          })
        })

        // Check if the response was successful.
        if (response.ok) {
          // The response was successful.

          // Get the response data.
          const data = await response.json()

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
      <form
        className="d-flex align-items-center"
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          onChange={(e) => setProductSearchText(e.target.value)}
          style={{ borderRadius: '1.25rem', marginRight: '1rem' }} // Extra margin for space between input and button
        />
        <ul>
          {productSearchResults
            ? productSearchResults.map((element) => <li>{element.title}</li>)
            : null}
        </ul>
        <Button
          type="submit"
          className="btn btn-primary"
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
      </form>
    </div>
  )
}

export default SearchBar
