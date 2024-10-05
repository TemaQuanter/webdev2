'use client'

import SearchBar from '../SearchBar'
import NavigationLinks from './NavigationLinks'

const Header = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
        padding: '1rem 0 1rem 0'
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: '80vw' }}
      >
        <span className="fs-2 fw-bold">TU Marketplace</span>
        <div
          style={{
            gap: '2vw'
          }}
          className="d-flex justify-content-between"
        >
          <button type="button" className="btn btn-outline-primary btn-sm">
            <i className="bi bi-cart-fill fs-5"></i>
          </button>
          <button className="btn btn-outline-primary btn-sm" type="button">
            <i className="bi bi-person-fill fs-5"></i>
          </button>
        </div>
      </div>
      <SearchBar />
      <NavigationLinks />
    </div>
  )
}

export default Header
