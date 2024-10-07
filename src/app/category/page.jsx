import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'
import { Row, Col, Container } from 'react-bootstrap'

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: '100%', margin: '1rem 0' }}
      >
        {/* Use Container-fluid for full-width responsiveness */}
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
              <ProductCard />
            </Col>
            <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
              <ProductCard />
            </Col>
            <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
              <ProductCard />
            </Col>
            <Col xs={12} sm={11} md={10} lg={9} className="mb-4">
              <ProductCard />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  )
}
