import React from 'react'

const SimpleCard = (props) => {
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
        {props.title}
      </h3>

      {/* Description */}
      <p style={{ marginBottom: '1rem', color: '#555' }}>{props.description}</p>
    </div>
  )
}

export default SimpleCard
