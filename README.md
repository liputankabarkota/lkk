# lkk
Liputan Kabar Kota asset website

## CDN split parts

This repo now includes modular asset parts for CDN delivery.

CSS:
- dist/00-critical.css
- dist/01-noncritical.css

JavaScript:
- dist/10-shared.js
- dist/11-images.js
- dist/12-article.js

Example CDN usage:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/00-critical.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/01-noncritical.css" media="print" onload="this.media='all'">

<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/10-shared.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/11-images.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/12-article.js"></script>
```

Replace `your-user`/`lkk` with the real GitHub repository path. This production-ready setup keeps critical CSS in the first paint path and delays non-critical styling without breaking the template.
