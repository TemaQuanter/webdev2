import Header from '../components/header/Header'
import ControlledCarousel from '../components/ControlledCarousel'
import HorizontalScrollView from '../components/HorizontalScrollView'
import Footer from '@/components/footer/Footer'
import TrendingCategories from '@/components/TrendingCategories'

export default function Home() {
  // First carousel with images
  const carouselOneImages = [
    {
      src: '/images/banner1.jpg',
      alt: 'Image 1',
      captionTitle: 'First Slide Title',
      captionText: 'This is the first slide description'
    },
    {
      src: '/images/carousel1-image2.jpg',
      alt: 'Image 2',
      captionTitle: 'Second Slide Title',
      captionText: 'This is the second slide description'
    }
  ]

  // No images passed for the second carousel to show placeholders
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ControlledCarousel images={carouselOneImages} />
      <div style={{ marginTop: '1rem' }}>
        <HorizontalScrollView />
      </div>
      <TrendingCategories />
      <div style={{ marginTop: '5rem' }}>
        {/* Second carousel with no images passed, so it shows placeholders */}
        <ControlledCarousel />
      </div>
      <Footer />
    </div>
  )
}
