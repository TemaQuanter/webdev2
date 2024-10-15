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
      <ButtonBack href="/account" />

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Sales
          </p>
          {/* Main Page Heading */}
        </Container>
        <hr />
      </div>

      <p className="fs-5 fw-bolder">Total income:</p>
      <p className="fs-4 fw-bolder">269 Euro</p>

      <Link href="/account/product_listing_form">
        <Button
          variant="primary"
          style={{ width: '40vw', maxWidth: '30rem', borderRadius: '20px' }}
        >
          <i
            className="bi bi-plus-circle-fill"
            style={{ marginRight: '1rem' }}
          ></i>
          List an item
        </Button>
      </Link>

      <Link href="/account/sales_history" style={{ marginTop: '1rem' }}>
        Sales history
      </Link>

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Listed items:
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </div>
  )
}

export default Purchases
