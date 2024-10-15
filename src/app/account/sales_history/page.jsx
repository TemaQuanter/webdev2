'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

import ProductCard from '@/components/ProductCard'
import ButtonBack from '@/components/ButtonBack'

const Purchases = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <ButtonBack href="/account/sales" />

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Sales history
          </p>
          {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      {/* Container for product cards */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto d-flex flex-column"
          style={{ maxWidth: '85%', gap: '5rem' }}
        >
          <div className="d-flex flex-column" style={{ gap: '1rem' }}>
            <p className="fw=lighter text-center">8 Oct 2024</p>
            <ProductCard />
            <ProductCard />
          </div>
          <div className="d-flex flex-column" style={{ gap: '1rem' }}>
            <p className="fw=lighter text-center">17 Sep 2024</p>
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Purchases
