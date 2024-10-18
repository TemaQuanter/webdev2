'use client'

import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar'
import NavigationLinks from './NavigationLinks'
import Link from 'next/link'

const Header = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [error, setError] = useState(null)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const sidebarStyle = {
    position: 'fixed',
    top: '0',
    right: isSidebarOpen ? '0' : '-250px', // Slide in from the right
    width: '250px',
    height: '100%',
    background: '#f8f9fa',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
    padding: '1rem',
    transition: 'right 0.3s ease' // Smooth transition for opening/closing
  }

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

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
        padding: '1rem 0'
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: '80vw' }}
      >
        <span style={{ fontSize: 'min(5vw, 2rem)' }} className="fw-bold">
          TU Marketplace
        </span>
        <div className="d-flex justify-content-between" style={{ gap: '2vw' }}>
          <Link href="/account/cart" passHref>
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-cart-fill fs-5"></i>
            </button>
          </Link>

          <Link href="/account" passHref>
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-person-fill fs-5"></i>
            </button>
          </Link>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-5"></i>
          </button>
        </div>
      </div>
      <SearchBar searchBarText={props.searchBarText} />
      <NavigationLinks />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Categories</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Display an error, if necessary */}
        {error && <p className="text-danger">{error}</p>}

        <ul style={{ listStyle: 'none', padding: '0' }}>
          {allCategories
            ? allCategories.map((category, index) => (
                <li className="mb-2" key={index}>
                  <Link href="/">{category.name}</Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  )
}

export default Header
