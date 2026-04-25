import { GetServerSideProps } from 'next'

function Robots() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
Allow: /

Sitemap: https://blog.maidinstgervais.com/sitemap.xml`)
  res.end()

  return { props: {} }
}

export default Robots
