'use client'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function TrendingCategories() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Detect screen size after component mounts
  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isMounted) {
    // Prevent rendering until component has mounted (to avoid hydration issues)
    return null
  }

  const buttonStyle = {
    width: '200px', // Adjust this size if needed
    height: '200px',
    borderRadius: '50%', // Makes the buttons circular
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    padding: 0
  }

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  const rowStyle = {
    maxWidth: '95%',
    margin: '0 auto',
    paddingLeft: '8%',
    paddingRight: '5%'
  }

  const items = [
    { id: 1, imgSrc: 'https://via.placeholder.com/150', alt: 'Hair Care' },
    {
      id: 2,
      imgSrc: 'https://via.placeholder.com/150',
      alt: 'Hair Care Accessories'
    },
    {
      id: 3,
      imgSrc: 'https://via.placeholder.com/150',
      alt: 'Cordless Vacuums'
    },
    { id: 4, imgSrc: 'https://via.placeholder.com/150', alt: 'Corded Vacuums' },
    {
      id: 5,
      imgSrc: 'https://via.placeholder.com/150',
      alt: 'Floor Care Accessories'
    },
    { id: 6, imgSrc: 'https://via.placeholder.com/150', alt: 'Air Treatment' },
    { id: 7, imgSrc: 'https://via.placeholder.com/150', alt: 'Lighting' },
    {
      id: 8,
      imgSrc: 'https://via.placeholder.com/150',
      alt: 'Lighting Accessories'
    }
  ]

  if (isSmallScreen) {
    // Render a horizontal scroll view on small screens with circular buttons
    return (
      <div>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '1rem'
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`} // Ensure unique key using id + index
              style={{
                margin: '0 1rem',
                width: '200px',
                height: '200px',
                borderRadius: '50%', // Keep the items circular
                overflow: 'hidden',
                flexShrink: 0 // Prevent shrinking in the horizontal scroll
              }}
            >
              <img src={item.imgSrc} alt={item.alt} style={imgStyle} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Row className="text-center my-4 mx-auto gx-0" style={rowStyle}>
        {items.slice(0, 4).map((item, index) => (
          <Col xs={12} sm={6} md={3} key={`${item.id}-${index}`}>
            <Button variant="outline-primary" style={buttonStyle}>
              <img src={item.imgSrc} alt={item.alt} style={imgStyle} />
            </Button>
          </Col>
        ))}
      </Row>

      <Row className="text-center my-4 mx-auto gx-0" style={rowStyle}>
        {items.slice(4).map((item, index) => (
          <Col xs={12} sm={6} md={3} key={`${item.id}-${index}`}>
            <Button variant="outline-primary" style={buttonStyle}>
              <img src={item.imgSrc} alt={item.alt} style={imgStyle} />
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default TrendingCategories
