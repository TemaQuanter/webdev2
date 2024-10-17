'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Assuming you have <Header /> and <Footer /> components already defined somewhere in your project
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

// Load react-window dynamically and ensure it only runs on the client-side
const DynamicFixedSizeList = dynamic(
  () => import('react-window').then((mod) => mod.FixedSizeList),
  { ssr: false }
)

const Page = () => {
  const [products, setProducts] = useState([])
  const [isClient, setIsClient] = useState(false)

  // Use sample data as a mock for now
  useEffect(() => {
    setIsClient(true)

    // Sample product data
    const sampleProducts = [
      { id: 1, name: 'Sample Product 1', price: '$10' },
      { id: 2, name: 'Sample Product 2', price: '$20' },
      { id: 3, name: 'Sample Product 3', price: '$30' },
      { id: 4, name: 'Sample Product 4', price: '$40' },
      { id: 5, name: 'Sample Product 5', price: '$50' },
      { id: 6, name: 'Sample Product 6', price: '$60' },
      { id: 7, name: 'Sample Product 7', price: '$70' },
      { id: 8, name: 'Sample Product 8', price: '$80' },
      { id: 9, name: 'Sample Product 9', price: '$90' },
      { id: 10, name: 'Sample Product 10', price: '$100' },
      { id: 11, name: 'Sample Product 11', price: '$110' },
      { id: 12, name: 'Sample Product 12', price: '$120' },
      { id: 13, name: 'Sample Product 13', price: '$130' },
      { id: 14, name: 'Sample Product 14', price: '$140' },
      { id: 15, name: 'Sample Product 15', price: '$150' },
      { id: 16, name: 'Sample Product 16', price: '$160' },
      { id: 17, name: 'Sample Product 17', price: '$170' },
      { id: 18, name: 'Sample Product 18', price: '$180' },
      { id: 19, name: 'Sample Product 19', price: '$190' },
      { id: 20, name: 'Sample Product 20', price: '$200' }
    ]

    // Simulate setting data as if it was fetched
    setProducts(sampleProducts)
  }, [])

  // Component to render each product
  const ProductCard = ({ index, style }) => {
    const product = products[index]
    return (
      <div style={{ ...style, padding: '10px' }}>
        {' '}
        {/* Added padding for internal gap */}
        <div style={styles.productCard}>
          <img
            src={`https://via.placeholder.com/150?text=Product+${product?.id}`}
            alt={product?.name}
            style={styles.image}
          />
          <div style={styles.productInfo}>
            <h3 style={styles.productName}>{product?.name}</h3>
            <p style={styles.productPrice}>{product?.price}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header /> {/* Include the header */}
      <div style={styles.container}>
        <h1 style={styles.header}>Stylish Product List</h1>
        {/* Conditionally render the list only when on the client and when products are loaded */}
        {isClient && products.length > 0 && (
          <DynamicFixedSizeList
            height={600} // Set height for the scrollable window
            itemCount={products.length} // Number of items from the sample data
            itemSize={240} // Adjusted height of each item to allow space for the gap
            width="100%" // Width of the list
          >
            {ProductCard}
          </DynamicFixedSizeList>
        )}
      </div>
      <Footer /> {/* Include the footer */}
    </>
  )
}

// Enhanced styles with black solid border and gap
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '"Helvetica Neue", sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    border: '1px solid black', // Added black solid border here
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
    boxSizing: 'border-box' // Ensures padding is included in height calculation
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginRight: '20px'
  },
  productInfo: {
    flex: '1'
  },
  productName: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px'
  },
  productPrice: {
    fontSize: '1.2rem',
    color: '#888'
  }
}

export default Page
