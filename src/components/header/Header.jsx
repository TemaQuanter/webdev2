'use client'

import { useState } from 'react'
import SearchBar from '../SearchBar'
import NavigationLinks from './NavigationLinks'

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const sidebarStyle = {
    position: 'fixed',
    top: '0',
    left: isSidebarOpen ? '0' : '-250px',
    width: '250px',
    height: '100%',
    background: '#f8f9fa',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
    padding: '1rem',
    transition: 'left 0.3s ease'
  }

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
        <span className="fs-2 fw-bold">TU Marketplace</span>
        <div className="d-flex justify-content-between" style={{ gap: '2vw' }}>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-cart-fill fs-5"></i>
          </button>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-person-fill fs-5"></i>
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

      <div style={sidebarStyle}>
        <h5 className="mb-3">
          Categories{' '}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </h5>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li className="mb-2">
            <a href="#">Link 1</a>
          </li>
          <li className="mb-2">
            <a href="#">Link 2</a>
          </li>
          <li className="mb-2">
            <a href="#">Link 3</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
