'use client'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  return (
    <div
      style={{
        maxWidth: '50vw', // 50% of the viewport width
        margin: '0 auto', // Center the container
        padding: '0 2rem' // Padding on left and right
      }}
    >
      <form className="d-flex align-items-center">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          style={{ borderRadius: '1.25rem', marginRight: '0.5rem' }} // Rounded input and spacing
        />
        <Button className="btn btn-outline-primary" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
