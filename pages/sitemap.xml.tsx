import { GetServerSideProps } from 'next'
import { getAllPublishedPosts } from '../lib/supabase'

function generateSiteMap(posts: { slug: string; updated_at: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blog.maidinstgervais.com</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>https://blog.maidinstgervais.com/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`
}

function SiteMap() {
  // This page is server-side only
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPublishedPosts()

  const sitemap = generateSiteMap(
    posts.map((p) => ({ slug: p.slug, updated_at: p.updated_at }))
  )

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default SiteMap
