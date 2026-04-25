import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="https://maidinstgervais.com" className={styles.logo}>
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>Maid in St Gervais</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="https://maidinstgervais.com/about" className={styles.navLink}>About</Link>
          <Link href="https://maidinstgervais.com/new-owners" className={styles.navLink}>Services</Link>
          <Link href="/" className={styles.navLink + ' ' + styles.navLinkActive}>Journal</Link>
          <Link href="https://maidinstgervais.com/#contact" className={styles.navCta}>Get in touch</Link>
        </nav>
      </div>
    </header>
  )
}
