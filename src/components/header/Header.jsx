'use client'

import { useState } from 'react'
import SearchBar from '../SearchBar'
import NavigationLinks from './NavigationLinks'
import Link from 'next/link'

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const sidebarStyle = {
    position: 'fixed',
    top: '0',
    right: isSidebarOpen ? '0' : '-250px', // Slide in from the right
    width: '250px',
    height: '100%',
    background: '#f8f9fa',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
    padding: '1rem',
    transition: 'right 0.3s ease' // Smooth transition for opening/closing
  }

  // List of 12 categories for the marketplace
  const categories = [
    { name: 'Hoodies', link: '/category/hoodies' },
    { name: 'Laptops', link: '/category/laptops' },
    { name: 'Smartphones', link: '/category/smartphones' },
    { name: 'Shoes', link: '/category/shoes' },
    { name: 'Accessories', link: '/category/accessories' },
    { name: 'Gaming Consoles', link: '/category/gaming-consoles' },
    { name: 'Headphones', link: '/category/headphones' },
    { name: 'Cameras', link: '/category/cameras' },
    { name: 'Fitness Gear', link: '/category/fitness-gear' },
    { name: 'Home Appliances', link: '/category/home-appliances' },
    { name: 'Books', link: '/category/books' },
    { name: 'Furniture', link: '/category/furniture' }
  ]

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
        padding: '1rem 0'
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: '80vw' }}
      >
        <span style={{ fontSize: 'min(5vw, 2rem)' }} className="fw-bold">
          TU Marketplace
        </span>
        <div className="d-flex justify-content-between" style={{ gap: '2vw' }}>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-cart-fill fs-5"></i>
          </button>
          <button className="btn btn-outline-primary btn-sm">
            <Link href="/account">
              <i className="bi bi-person-fill fs-5"></i>
            </Link>
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-5"></i>
          </button>
        </div>
      </div>
      <SearchBar />
      <NavigationLinks />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Categories</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: '0' }}>
          {categories.map((category, index) => (
            <li className="mb-2" key={index}>
              <Link href={category.link}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
