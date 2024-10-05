'use client'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  return (
    <div
      style={{
        width: '80vw',
        margin: '0 auto'
      }}
    >
      <form
        className="d-flex align-items-center"
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          style={{ borderRadius: '1.25rem', marginRight: '1rem' }} // Extra margin for space between input and button
        />
        <Button
          type="submit"
          className="btn btn-primary"
          style={{
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            minWidth: '2.5rem', // Ensure width doesn't get adjusted by flex or other layouts
            minHeight: '2.5rem' // Ensure height stays equal to width
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
