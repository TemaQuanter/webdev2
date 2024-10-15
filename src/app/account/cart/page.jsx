'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/ProductCard'

const Purchase = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Cart</h3> {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      {/* First Container for ProductCard */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto d-flex flex-column"
          style={{ maxWidth: '85%', gap: '5rem' }}
        >
          <div>
            <ProductCard />

            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '1rem'
              }}
            >
              <strong>x2</strong>
            </div>
          </div>

          <div>
            <ProductCard />
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '1rem'
              }}
            >
              <strong>x2</strong>
            </div>
          </div>
        </div>
        <div
          style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5rem' }}
        >
          <strong>Total</strong>
        </div>
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '1.5rem'
          }}
        >
          <strong>200 Euro</strong>
        </div>
      </Container>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            border: isHovered ? '1px solid #007bff' : '1px solid transparent',
            fontWeight: 'bold',
            backgroundColor: isHovered ? '#007bff' : 'aliceblue',
            color: isHovered ? 'white' : '#007bff',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
            cursor: 'pointer',
            marginBottom: '3rem'
          }}
        >
          Purchase
        </button>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Purchase
