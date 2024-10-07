import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: '100vw', margin: '1rem 0 1rem 0' }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={4}>
              <ProductCard />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <ProductCard />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <ProductCard />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <ProductCard />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  )
}
