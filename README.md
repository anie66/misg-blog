# MISG Blog — blog.maidinstgervais.com

Next.js static site for the Maid in St Gervais journal. Pulls content from Supabase, generates static HTML at build time for full Google indexing.

## Setup

### 1. Environment variables

In Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://tudkeaibtvjzxhgntlau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Deploy

Push to the `main` branch on GitHub. Vercel auto-deploys.

### 3. Custom domain

In Vercel project settings > Domains, add `blog.maidinstgervais.com`.
Then in Cloudflare (or GoDaddy), add a CNAME record:

```
Type: CNAME
Name: blog
Value: cname.vercel-dns.com
```

## Publishing workflow

Posts are published via the Lovable admin at maidinstgervais.com/admin/blog.

When a post is published, Vercel will pick it up within 5 minutes via ISR (Incremental Static Regeneration). No manual rebuild needed.

To force an immediate rebuild: go to Vercel dashboard > Deployments > Redeploy.

## Tech stack

- Next.js 14 (Pages Router)
- Supabase (existing project — read only)
- Vercel (free tier)
- CSS Modules
- react-markdown for post content rendering
