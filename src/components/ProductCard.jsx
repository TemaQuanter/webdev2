import React from 'react'
import styled, { keyframes } from 'styled-components'

// Define keyframes for the glowing border effect
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.7); /* Blue glow at the midpoint */
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`

// Define the container with a glowing border effect
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: min(100%);
  border: 1px solid black; /* Black border */
  margin: 0 auto;
  padding: 1rem;
  border-radius: 10px;
  animation: ${glow} 2s infinite ease-in-out; /* Apply the glow animation */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02); /* Slightly reduce the hover scale */
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.9); /* Intensify on hover */
  }
`

const ProductImage = styled.img`
  width: 100%;
  max-width: 150px;
  aspect-ratio: 1;
  background-color: #d3d3d3;
  object-fit: cover;
  opacity: 0;
  animation: fadeIn 1s forwards;
`

const Star = styled.i`
  color: #ffc107;
  display: inline-block;
  animation: bounce 0.5s ease;
`

// Define keyframes for image fade-in and star bounce
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

const FlexboxLayout = (props) => (
  <ProductContainer>
    {/* Left Section - Product Image */}
    <div
      style={{
        flex: 2,
        padding: '1rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderRight: '1px solid black' // Maintain a black divider
      }}
    >
      <ProductImage src={props.imageUrl} alt="Product Image" />
      {/* Stars rating directly below the image */}
      <div style={{ marginTop: '0.5rem' }}>
        {Array(4)
          .fill()
          .map((_, i) => (
            <Star
              key={i}
              className="bi bi-star-fill"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        <Star className="bi bi-star-half" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>

    {/* Right Section - Product Details */}
    <div
      style={{
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '1rem',
        boxSizing: 'border-box',
        transition: 'color 0.3s ease'
      }}
    >
      {/* Product details */}
      <h5 style={{ marginBottom: '0.5rem' }}>{props.title}</h5>
      <p style={{ marginBottom: '0.25rem' }}>
        Seller: <span className="fw-lighter">{props.sellerName}</span>
      </p>
      <p style={{ marginBottom: '0.25rem' }}>
        Description: <span className="fw-lighter">{props.description}</span>
      </p>
      <p style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>
        Price: EUR {props.price}
      </p>
    </div>
  </ProductContainer>
)

export default FlexboxLayout
