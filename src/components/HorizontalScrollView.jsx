import React from 'react'

const HorizontalScrollView = () => {
  // Example items with image paths
  const items = [
    { id: 1, imgSrc: '/images/hoodie.png', alt: 'Hoodie Image' },
    { id: 2, imgSrc: '/images/laptop.png', alt: 'Banner 1' },
    { id: 3, imgSrc: '/images/phone.png', alt: 'Banner 2' },
    { id: 4, imgSrc: '/images/shoes.png', alt: 'Banner 2' },
    { id: 5, imgSrc: '/images/watch.png', alt: 'Banner 2' },
    { id: 6, imgSrc: '/images/headphones.png', alt: 'Banner 2' },
    { id: 7, imgSrc: '/images/book.png', alt: 'Banner 2' },
    { id: 8, imgSrc: '/images/furniture.png', alt: 'Banner 2' },
    { id: 9, imgSrc: '/images/vacuum.png', alt: 'Banner 2' }
  ]

  return (
    <div
      className="horizontal-scroll-container"
      style={{ display: 'flex', overflowX: 'scroll' }}
    >
      {items.map((item) => (
        <div
          style={{
            margin: '3rem',
            width: '15rem',
            height: '20rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          key={item.id}
          className="scroll-item"
        >
          <img
            src={item.imgSrc}
            alt={item.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px', // To round the corners
              border: '2px solid black' // Black border of 2px thickness
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default HorizontalScrollView
