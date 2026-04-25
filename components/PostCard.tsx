import Link from 'next/link'
import { BlogPost, formatDate } from '../lib/supabase'
import styles from './PostCard.module.css'

interface Props {
  post: BlogPost
}

export default function PostCard({ post }: Props) {
  const date = post.published_at || post.created_at

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.body}>
        {date && (
          <time className={styles.date} dateTime={date}>
            {formatDate(date)}
          </time>
        )}
        <h2 className={styles.title}>{post.title}</h2>
        {post.excerpt && (
          <p className={styles.excerpt}>
            {post.excerpt.split('\n')[0]}
          </p>
        )}
        <span className={styles.readMore}>Read more →</span>
      </div>
    </Link>
  )
}
  )
}
