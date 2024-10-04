import '../NavigationLinks.css' // Adjust the path as needed
import Link from 'next/link'

const NavigationLinks = () => {
  return (
    <div className="navigation-links">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/clearance">Clearance</Link>
    </div>
  )
}

export default NavigationLinks
