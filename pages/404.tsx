import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './404.module.css'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — Maid in St Gervais</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.code}>404</div>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.text}>That page doesn't exist or has been moved.</p>
          <Link href="/" className={styles.link}>Back to Journal</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
