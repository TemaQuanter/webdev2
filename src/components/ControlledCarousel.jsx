'use client'

import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

function ControlledCarousel({ images = [] }) {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
      {images.length > 0 ? (
        images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%', // Take full width on larger screens
                height: 'auto', // Maintain aspect ratio
                maxHeight: '600px', // Optional: Set a max height to prevent too tall images
                objectFit: 'cover' // Ensure the image covers the container without distortion
              }}
            />
            <Carousel.Caption>
              <h3>{image.captionTitle}</h3>
              <p>{image.captionText}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      ) : (
        // If no images are passed, show placeholders
        <>
          <Carousel.Item>
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e9ecef'
              }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e9ecef'
              }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e9ecef'
              }}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </>
      )}
    </Carousel>
  )
}

export default ControlledCarousel
