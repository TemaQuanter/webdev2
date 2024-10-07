import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/ProductCard'
import { Row, Col, Container } from 'react-bootstrap'
import HorizontalScrollView from '@/components/HorizontalScrollView'
import ControlledCarousel from '@/components/ControlledCarousel'
import SimpleCard from '@/components/SimpleCard'

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Categories</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Placeholder Rectangle */}
      <div
        style={{
          width: '100%',
          height: '350px',
          backgroundColor: '#f0f0f0'
        }}
      ></div>

      <SimpleCard />

      {/* Category Heading */}
      <div className="bg-light py-3">
        <Container>
          <h3 className="text-left">Products</h3> {/* Main Page Heading */}
        </Container>
      </div>

      {/* Products Section */}
      <Container fluid className="my-4">
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

      {/* Footer Section */}
      <Footer />
    </div>
  )
}
