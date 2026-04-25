import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import { getAllPublishedPosts, BlogPost } from '../lib/supabase'
import styles from './index.module.css'

interface Props {
  posts: BlogPost[]
}

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Journal — Maid in St Gervais</title>
        <meta
          name="description"
          content="Practical insights on managing and maintaining alpine property in Saint-Gervais-les-Bains. From end-of-season care to guest preparation — honest advice from the team on the ground."
        />
        <meta property="og:title" content="Journal — Maid in St Gervais" />
        <meta
          property="og:description"
          content="Practical insights on managing and maintaining alpine property in Saint-Gervais-les-Bains."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.maidinstgervais.com" />
        <link rel="canonical" href="https://blog.maidinstgervais.com" />
      </Head>

      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLabel}>Journal</div>
            <h1 className={styles.heroTitle}>
              Property management,<br />
              as it actually is.
            </h1>
            <p className={styles.heroSub}>
              Practical notes from the team managing properties across Saint-Gervais and the Chamonix valley. No gloss. Just what we see, what we do, and what owners need to know.
            </p>
          </div>
        </section>

        <section className={styles.posts}>
          <div className={styles.postsInner}>
            {posts.length === 0 ? (
              <p className={styles.empty}>No posts published yet.</p>
            ) : (
              <div className={styles.grid}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPublishedPosts()

  return {
    props: { posts },
    revalidate: 300, // Rebuild every 5 minutes if traffic hits the page
  }
}
