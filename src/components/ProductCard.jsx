import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const FlexboxLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap', // Ensures wrapping on smaller screens
        width: 'min(100%)', // Full width
        border: '1px solid black',
        margin: '0 auto' // Center the container
      }}
    >
      {/* Left Section - 2/5 */}
      <div
        style={{
          flex: 2,
          padding: '1rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          borderRight: '1px solid black' // Add a vertical divider line
        }}
      >
        {/* Product image */}
        <div
          style={{
            width: '100%', // Make the image responsive
            maxWidth: '150px', // Cap the image size to 150px
            aspectRatio: '1', // Keep the image square
            backgroundColor: '#d3d3d3'
          }}
        />
        {/* Stars rating directly below the image */}
        <div>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </div>
      </div>

      {/* Right Section - 3/5 */}
      <div
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Align content to the top
          padding: '1rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Product details */}
        <h5 style={{ marginBottom: '0.5rem' }}>Product Name</h5>
        <p style={{ marginBottom: '0.25rem' }}>
          Seller: <span className="fw-lighter">John Johnson</span>
        </p>
        <p style={{ marginBottom: '0.25rem' }}>
          Description:{' '}
          <span className="fw-lighter">This is a product description.</span>
        </p>
        <p style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>
          Price: EUR 75
        </p>
      </div>
    </div>
  )
}

export default FlexboxLayout
