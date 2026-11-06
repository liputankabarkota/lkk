# lkk
Liputan Kabar Kota asset website

## CDN split parts

This repo now includes modular asset parts for CDN delivery.

CSS:
- dist/00-base.css
- dist/01-header.css
- dist/02-home.css
- dist/03-article.css
- dist/04-responsive.css

JavaScript:
- dist/10-shared.js
- dist/11-images.js
- dist/12-article.js

Example CDN usage:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/00-base.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/01-header.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/02-home.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/03-article.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/04-responsive.css">

<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/10-shared.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/11-images.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/your-user/lkk@main/dist/12-article.js"></script>
```

Replace `your-user`/`lkk` with the real GitHub repository path. For production, keep the critical CSS as the first CSS load and defer non-critical script as appropriate.
