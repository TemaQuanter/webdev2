import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const FlexboxLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: 'min(100vw, 30rem)',
        border: '1px solid black'
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
          boxSizing: 'border-box'
        }}
      >
        {/* Product image */}
        <div
          style={{
            width: '150px',
            height: '150px',
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
          justifyContent: 'top',
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
