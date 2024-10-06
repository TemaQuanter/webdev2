import Header from '../components/header/Header'
import ControlledCarousel from '../components/ControlledCarousel'
import HorizontalScrollView from '../components/HorizontalScrollView'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ControlledCarousel />
      <div style={{ marginTop: '1rem' }}>
        <HorizontalScrollView />
      </div>

      <p
        style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '5rem' }}
        className="fs-3"
      >
        Trending Categories
      </p>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: '100vw' }}
      >
        <Container>
          <Row className="text-center">
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
          <Row className="text-center">
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
          <Row className="text-center">
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </div>
      <div style={{ marginTop: '5rem' }}>
        <ControlledCarousel />
      </div>
      <Footer />
    </div>
  )
}
