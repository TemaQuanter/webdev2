import MyNavbar from './components/Navbar'
import CompanyInfo from './components/CompanyInfo' // Adjust path as needed
import TrendingProducts from './components/TrendingProducts' // Adjust path as needed
import SearchBar from './components/SearchBar' // Adjust path as necessary
import NavigationLinks from './components/NavigationLinks'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MyNavbar />
      <NavigationLinks />
      <SearchBar />
      <CompanyInfo />
      <TrendingProducts />
    </div>
  )
}
