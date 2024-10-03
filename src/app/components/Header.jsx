'use client'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <Navbar expand="lg" className="navbar moving-gradient">
      <Container>
        <Navbar.Brand
          href="#"
          style={{ fontFamily: 'Press Start 2P', fontSize: '24px', flex: 1 }}
        >
          TU MARKETPLACE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ gap: '50px' }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/clearance">Clearance</Nav.Link>
          </Nav>
          <form className="d-flex" style={{ alignItems: 'center' }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for products"
              aria-label="Search"
              style={{ marginRight: '10px', borderRadius: '20px' }} // Adjust spacing here
            />
            <button className="btn btn-outline-primary" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <div style={{ marginLeft: '10px', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </div>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
