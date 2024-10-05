import styles from '../styles/NavigationLinks.module.css'
import Link from 'next/link'

const NavigationLinks = () => {
  return (
    <div className={styles.navigationLinks}>
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/clearance">Clearance</Link>
    </div>
  )
}

export default NavigationLinks
