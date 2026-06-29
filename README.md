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

After the new host is live, point `tools.yageumyageum.app` at that host and keep the canonical SEO URL as `https://tools.yageumyageum.app/`.

## AdSense

AdSense settings live in `public/ads-config.json`.

For Auto ads, fill only the publisher client ID and enable Auto ads:

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

Replace the example in `public/ads.txt` with the AdSense publisher line after AdSense gives you the publisher ID:

```txt
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```
