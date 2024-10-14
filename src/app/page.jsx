import Header from '../components/header/Header'
import ControlledCarousel from '../components/ControlledCarousel'
import HorizontalScrollView from '../components/HorizontalScrollView'
import Footer from '@/components/footer/Footer'
import TrendingCategories from '@/components/TrendingCategories'

export default function Home() {
  // First carousel with images
  const carouselOneImages = [
    {
      src: '/images/banners1.png',
      alt: 'Image 1',
      captionTitle: '',
      captionText: ''
    },
    {
      src: '/images/banners2.png',
      alt: 'Image 2',
      captionTitle: '',
      captionText: ''
    }
  ]

  const carouselTwoImages = [
    {
      src: '/images/banners3.png',
      alt: 'Image 1',
      captionTitle: '',
      captionText: ''
    },
    {
      src: '/images/banners4.png',
      alt: 'Image 2',
      captionTitle: '',
      captionText: ''
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
        <ControlledCarousel images={carouselTwoImages} />
      </div>
      <Footer />
    </div>
  )
}
