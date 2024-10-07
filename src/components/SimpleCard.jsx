import React from 'react'

const SimpleCard = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        borderRadius: '8px'
      }}
    >
      {/* Title */}
      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        The main title (some text)
      </h3>

      {/* Description */}
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        Some description here
      </p>

      {/* Button */}
      <button
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '0.5rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        See all
      </button>
    </div>
  )
}

export default SimpleCard
