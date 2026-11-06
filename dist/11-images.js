(function () {
  function normalizeImageSource(value) {
    return (value || '').replace(/[?#].*$/, '').trim().toLowerCase();
  }

  function buildResponsiveSrcSet(src) {
    if (!src) return '';
    return [480, 800, 1200].map(function (width) {
      return src + ' ' + width + 'w';
    }).join(', ');
  }

  function ensureFeaturedImage(image) {
    if (!image) return;
    if (!image.hasAttribute('srcset')) {
      image.setAttribute('srcset', buildResponsiveSrcSet(image.getAttribute('src')));
    }
    if (!image.hasAttribute('sizes')) {
      image.setAttribute('sizes', '(max-width: 680px) 100vw, (max-width: 980px) calc(100vw - 104px), 784px');
    }
    if (!image.hasAttribute('width')) { image.setAttribute('width', '1200'); }
    if (!image.hasAttribute('height')) { image.setAttribute('height', '630'); }
    if (!image.hasAttribute('loading')) { image.setAttribute('loading', 'eager'); }
    if (!image.hasAttribute('fetchpriority')) { image.setAttribute('fetchpriority', 'high'); }
    image.decoding = 'async';
  }

  function ensureLazyImages() {
    document.querySelectorAll('img[data-lazy="true"], .lkk-news-thumb, .lkk-mini-card-media img').forEach(function (image) {
      if (!image.hasAttribute('loading')) {
        image.setAttribute('loading', 'lazy');
      }
      if (!image.hasAttribute('decoding')) {
        image.setAttribute('decoding', 'async');
      }
    });
  }

  function ensureFeaturedArticleImage() {
    var featured = document.querySelector('.lkk-article-featured-image');
    if (featured) {
      ensureFeaturedImage(featured);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureLazyImages();
      ensureFeaturedArticleImage();
    });
  } else {
    ensureLazyImages();
    ensureFeaturedArticleImage();
  }

  window.lkkImageUtils = {
    normalizeImageSource: normalizeImageSource,
    buildResponsiveSrcSet: buildResponsiveSrcSet,
    ensureFeaturedImage: ensureFeaturedImage
  };
})();
