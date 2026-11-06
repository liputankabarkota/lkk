# Deployment Checklist for GitHub CDN

## Repository and branch

- Repo: `liputankabarkota/lkk`
- Default branch: `main`
- CDN base: `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main`

## Upload files

Upload all files from the `dist/` folder to the GitHub repository, including:

- `dist/00-critical.css`
- `dist/01-noncritical.css`
- `dist/02-home.css`
- `dist/03-article.css`
- `dist/04-responsive.css`
- `dist/10-shared.js`
- `dist/11-images.js`
- `dist/12-article.js`
- `dist/manifest.json`

## CDN URLs to validate

- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/00-critical.css`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/01-noncritical.css`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/02-home.css`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/03-article.css`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/04-responsive.css`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/10-shared.js`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/11-images.js`
- `https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/12-article.js`

## Template usage

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/00-critical.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/01-noncritical.css" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/01-noncritical.css" /></noscript>

<script defer src="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/10-shared.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/11-images.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/liputankabarkota/lkk@main/dist/12-article.js"></script>
```

## Quality checks

- Ensure no CSS or JS file returns 404.
- Keep critical CSS before noncritical CSS.
- Use `defer` for all JavaScript.
- Do not lazy-load the LCP image.
- Check homepage, article, label, archive, and search pages.
- Validate mobile and desktop layout.
- Check LCP, FCP, CLS, INP, and TTFB after deployment.

## Final note

The final Blogger XML theme file is `template-web.xml`, and the CDN-ready modular package is in `dist/`.
