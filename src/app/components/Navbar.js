'use client'
import { useState } from 'react'
import { Nav, Navbar, Container, Offcanvas, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NavigationLinks from './NavigationLinks' // Import the new component

const MyNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleClose = () => setShowSidebar(false)
  const handleShow = () => setShowSidebar(true)

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar"
        style={{
          background: 'linear-gradient(90deg, #6e7dff, #8bcbff)', // Gradient background
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container>
          <Button variant="link" onClick={handleShow} style={{ padding: 0 }}>
            <FontAwesomeIcon icon={faBars} size="lg" /> {/* Hamburger icon */}
          </Button>
          <Navbar.Brand
            href="#"
            className="mx-auto"
            style={{ fontFamily: 'Press Start 2P', fontSize: '24px' }}
          >
            TU MARKETPLACE
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/clearance">Clearance</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default MyNavbar
