import styles from '../../styles/NavigationLinks.module.css'
import Link from 'next/link'

const NavigationLinks = () => {
  return (
    <div className={styles.navigationLinks} style={{ width: '90vw' }}>
      <Link href="/">Home</Link>
      <Link href="/delivery">Delivery</Link>
      <Link href="/aboutus">About us</Link>
    </div>
  )
}

export default NavigationLinks
