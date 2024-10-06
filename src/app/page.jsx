import Header from '../components/header/Header'
import ControlledCarousel from '../components/ControlledCarousel'
import HorizontalScrollView from '../components/HorizontalScrollView'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Footer from '@/components/footer/Footer'
import TrendingCategories from '@/components/TrendingCategories'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ControlledCarousel />
      <div style={{ marginTop: '1rem' }}>
        <HorizontalScrollView />
      </div>
      <TrendingCategories />
      <div style={{ marginTop: '5rem' }}>
        <ControlledCarousel />
      </div>
      <Footer />
    </div>
  )
}
