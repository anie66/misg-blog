import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>M</span>
            <div>
              <div className={styles.brandName}>Maid in St Gervais</div>
              <div className={styles.brandSub}>Property management, Saint-Gervais-les-Bains</div>
            </div>
          </div>
          <div className={styles.links}>
            <Link href="https://maidinstgervais.com/about">About</Link>
            <Link href="https://maidinstgervais.com/new-owners">Services</Link>
            <Link href="/">Journal</Link>
            <Link href="https://maidinstgervais.com/#contact">Contact</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} The Maids Group SASU. SIRET 951 374 297 00012.</span>
          <span>243 Avenue de Genève, Le Fayet, 74170 Saint-Gervais-les-Bains, France</span>
        </div>
      </div>
    </footer>
  )
}
