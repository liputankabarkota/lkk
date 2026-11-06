# LKK
Liputan Kabar Kota asset website

## Final template and CDN package

- Final Blogger XML template: `template-web.xml`
- CDN asset package: `dist/`
- Manifest: `dist/manifest.json`

## CDN split parts

This repo includes a production-ready modular asset split for CDN delivery.

CSS:
- `dist/00-critical.css`
- `dist/01-noncritical.css`
- `dist/02-home.css`
- `dist/03-article.css`
- `dist/04-responsive.css`

JavaScript:
- `dist/10-shared.js`
- `dist/11-images.js`
- `dist/12-article.js`

## Example CDN usage

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

This production-ready setup keeps critical CSS in the first-paint path and defers non-critical styling without breaking the template.

## Deployment checklist

1. Upload all files in `dist/` to the GitHub repo.
2. Keep the default branch as `main`.
3. Confirm the CDN URLs return HTTP 200 and are not 404.
4. Keep the CSS order as: critical first, noncritical second.
5. Load JavaScript with `defer` only.
6. Validate homepage, article, label, and search pages on mobile + desktop.
7. Check Lighthouse values: LCP, FCP, CLS, INP, TTFB.
