# Yageumyageum Tools Pages

Public GitHub Pages export for the Yageumyageum web tools page.

This repository is intentionally separated from the app workspace. It should only contain static files under `public/` plus the GitHub Pages workflow, so Swift sources, Supabase migrations, local build artifacts, and service configuration files are not published.

## Deploy

1. Authenticate GitHub CLI: `gh auth login`
2. Create and push the repository:

```bash
cd /Users/doyoukim/Documents/yageumyageum-tools-pages
gh repo create yageumyageum-tools-pages --public --source=. --remote=origin --push
```

The workflow deploys `public/` to GitHub Pages. By default it rewrites SEO URLs to `https://<owner>.github.io/<repo>/`. To use a custom domain later, set the repository variable `PAGES_SITE_URL` to the public URL, including `https://`.

## Alternative Hosts

The site is a static export. Vercel, Netlify, and Cloudflare Pages should all serve the `public/` directory as the site root.

### Vercel

```bash
vercel login
vercel link
vercel deploy --prod
```

The `vercel.json` file sets `public/` as the output directory and keeps clean, trailing-slash URLs.

### Netlify

```bash
netlify login
netlify deploy --prod --dir public
```

The `netlify.toml` file sets `public/` as the publish directory.

### Cloudflare Pages

```bash
npx wrangler login
npx wrangler pages deploy public --project-name yageumyageum-tools --branch main
```

The `wrangler.jsonc` file also declares `public/` as the Pages output directory for dashboard-based builds.

The current public SEO URL is `https://yageumyageum-tools-pages.vercel.app/`. After `tools.yageumyageum.app` DNS is live, set `SITE_URL=https://tools.yageumyageum.app/`, rebuild, and redeploy.

## AdSense

AdSense settings live in `public/ads-config.json`.

After AdSense gives you a publisher client ID, configure the site with:

```bash
node scripts/configure-adsense.mjs --client ca-pub-0000000000000000
```

This writes both `public/ads-config.json` and `public/ads.txt`. By default it enables Auto ads. For manual display units, pass the numeric slot IDs:

```bash
node scripts/configure-adsense.mjs \
  --client ca-pub-0000000000000000 \
  --home-top 1111111111 \
  --tool-top 2222222222 \
  --article-inline 3333333333 \
  --article-bottom 4444444444 \
  --side-left 5555555555 \
  --side-right 6666666666
```

For deployment-time configuration, set `ADSENSE_CLIENT` and optional slot environment variables before running `node scripts/build-seo-pages.mjs`:

```bash
ADSENSE_CLIENT=ca-pub-0000000000000000 \
ADSENSE_SLOT_TOOL_TOP=2222222222 \
ADSENSE_SLOT_ARTICLE_INLINE=3333333333 \
node scripts/build-seo-pages.mjs
```

The supported slot environment variables are `ADSENSE_SLOT_HOME_TOP`, `ADSENSE_SLOT_TOOL_TOP`, `ADSENSE_SLOT_ARTICLE_INLINE`, `ADSENSE_SLOT_ARTICLE_BOTTOM`, `ADSENSE_SLOT_SIDE_LEFT`, and `ADSENSE_SLOT_SIDE_RIGHT`.

For Auto ads only, the resulting config looks like:

```json
{
  "adsense": {
    "enabled": true,
    "client": "ca-pub-0000000000000000",
    "autoAds": {
      "enabled": true
    }
  }
}
```

For manual ad units, also fill the numeric slot IDs under `adsense.slots`. Empty manual slots are hidden when Auto ads is enabled.

The script writes the required `public/ads.txt` seller line in this format:

```txt
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

## Search Submission

The current sitemap is `https://yageumyageum-tools-pages.vercel.app/sitemap.xml`.

IndexNow is configured with `public/bf695f251fd5a6f47bd9e627cba4b424.txt`. After deployment, submit all sitemap URLs to participating search engines:

```bash
node scripts/submit-indexnow.mjs
```
