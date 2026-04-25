import type { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
  getPostBySlug,
  getAllPublishedSlugs,
  type BlogPost,
  formatDate,
} from '../../lib/supabase'
import styles from './[slug].module.css'

interface Props {
  post: BlogPost
}

export default function BlogPost({ post }: Props) {
  const date = post.published_at || post.created_at
  const canonicalUrl = `https://blog.maidinstgervais.com/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt?.split('\n')[0] || '',
    datePublished: date,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Maid in St Gervais',
      url: 'https://maidinstgervais.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maid in St Gervais',
      url: 'https://maidinstgervais.com',
    },
    url: canonicalUrl,
    ...(post.cover_image_path && { image: post.cover_image_path }),
  }

  return (
    <>
      <Head>
        <title>{post.title} — Maid in St Gervais</title>
        <meta name="description" content={post.excerpt?.split('\n')[0] || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt?.split('\n')[0] || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {post.cover_image_path && (
          <meta property="og:image" content={post.cover_image_path} />
        )}
        <meta property="article:published_time" content={date || ''} />
        <meta property="article:modified_time" content={post.updated_at} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt?.split('\n')[0] || post.title} />
        {post.cover_image_path && (
          <meta name="twitter:image" content={post.cover_image_path} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main>
        <article>
          <div className={styles.hero}>
            <div className={styles.heroInner}>
              <Link href="/" className={styles.back}>
                ← Journal
              </Link>
              {date && (
                <time className={styles.date} dateTime={date}>
                  {formatDate(date)}
                </time>
              )}
              <h1 className={styles.title}>{post.title}</h1>
            </div>
          </div>

          {post.cover_image_path && (
            <div className={styles.coverWrap}>
              <div className={styles.coverInner}>
                <img
                  src={post.cover_image_path}
                  alt={post.title}
                  className={styles.cover}
                />
              </div>
            </div>
          )}

          <div className={styles.body}>
            <div className={styles.bodyInner}>
              <div className="prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className={styles.footer}>
                <div className={styles.footerDivider} />
                <div className={styles.footerCta}>
                  <p>Managing property in Saint-Gervais or the Chamonix valley?</p>
                  <Link
                    href="https://maidinstgervais.com/new-owners"
                    className={styles.footerCtaLink}
                  >
                    See how we work
                  </Link>
                </div>
                <Link href="/" className={styles.backBottom}>
                  ← Back to Journal
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPublishedSlugs()

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPostBySlug(slug)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: { post },
    revalidate: 300,
  }
}
