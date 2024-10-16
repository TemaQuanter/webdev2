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
    { id: 1, imgSrc: 'images/accessoriesLogo.png', alt: 'Accessories' },
    {
      id: 2,
      imgSrc: 'images/BookLogo.png',
      alt: 'Book'
    },
    {
      id: 3,
      imgSrc: 'images/camerasLogo.png',
      alt: 'Camera'
    },
    { id: 4, imgSrc: 'images/furnitureLogo.png', alt: 'Furniture' },
    {
      id: 5,
      imgSrc: 'images/HeadphonesLogo.png',
      alt: 'Headphones'
    },
    { id: 6, imgSrc: 'images/hoodieLogo.png', alt: 'Hoodie' },
    { id: 7, imgSrc: 'images/laptopLogo.png', alt: 'Laptop' },
    {
      id: 8,
      imgSrc: 'images/shoesLogo.png',
      alt: 'shoes'
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
