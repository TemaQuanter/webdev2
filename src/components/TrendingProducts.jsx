'use client'
import { Carousel, Button } from 'react-bootstrap'
import styles from '../styles/TrendingProducts.module.css' // Adjust the path as needed

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      imageUrl: '/images/product1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$20',
      imageUrl: '/images/product2.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$30',
      imageUrl: '/images/product3.jpg'
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$40',
      imageUrl: '/images/product4.jpg'
    },
    // Add more products as needed
    {
      id: 5,
      name: 'Product 5',
      price: '$50',
      imageUrl: '/images/product5.jpg'
    },
    {
      id: 6,
      name: 'Product 6',
      price: '$60',
      imageUrl: '/images/product6.jpg'
    },
    {
      id: 7,
      name: 'Product 7',
      price: '$70',
      imageUrl: '/images/product7.jpg'
    },
    { id: 8, name: 'Product 8', price: '$80', imageUrl: '/images/product8.jpg' }
  ]

  return (
    <div className={styles.trendingProducts}>
      <h2 className={styles.title}>Trending Products</h2>
      <Carousel interval={4000} controls={true}>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <div className={styles.productItem}>
              <img
                className="d-block"
                src={product.imageUrl}
                alt={product.name}
              />
              <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <Button variant="primary">Add to Cart</Button>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default TrendingProducts
