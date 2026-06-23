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
