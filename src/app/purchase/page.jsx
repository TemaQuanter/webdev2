'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'

const Purchase = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Purchase</h3> {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      {/* First Container for ProductCard */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div className="mx-auto" style={{ maxWidth: '85%' }}>
          <ProductCard />
        </div>
      </Container>

      {/* Second Container for Input and Button */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto"
          style={{ maxWidth: '85%', display: 'flex', justifyContent: 'center' }}
        >
          {/* Flexbox for input and button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <input
              type="number"
              placeholder="Number of items"
              style={{
                width: '150px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              min="1"
              defaultValue="1"
            />
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                padding: '5px 10px',
                borderRadius: '20px',
                border: isHovered
                  ? '1px solid #007bff'
                  : '1px solid transparent',
                fontWeight: 'bold',
                backgroundColor: isHovered ? '#007bff' : 'aliceblue',
                color: isHovered ? 'white' : '#007bff',
                textDecoration: 'none',
                transition: 'background-color 0.3s, color 0.3s',
                cursor: 'pointer'
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Container>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Purchase
