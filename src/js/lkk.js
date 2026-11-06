(function () {
  function normalizeUrl(value) {
    return String(value || '').replace(/[?#].*$/, '').trim().toLowerCase();
  }

  function buildToc() {
    var article = document.querySelector('.lkk-article-body');
    var toc = document.querySelector('.lkk-article-toc');
    if (!article || !toc) return;

    var order = article.querySelectorAll('h2, h3, h4, h5, h6');
    var list = toc.querySelector('ol');
    if (!list) return;

    if (list.children.length) return;

    for (var i = 0; i < order.length; i += 1) {
      var heading = order[i];
      var text = (heading.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text) continue;

      var id = heading.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'bagian-' + (i + 1);
      heading.id = id;

      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = text;
      item.appendChild(link);
      list.appendChild(item);
    }

    if (list.children.length) {
      toc.hidden = false;
    }
  }

  function fixFeaturedImages() {
    var article = document.querySelector('.lkk-article-body');
    if (!article) return;

    var firstImage = article.querySelector('img');
    var feature = document.querySelector('.lkk-article-featured-image');
    if (!firstImage || !feature) return;

    if (normalizeUrl(firstImage.src) === normalizeUrl(feature.src)) {
      var wrapper = firstImage.parentNode;
      if (wrapper && wrapper.tagName === 'A') {
        wrapper.parentNode.removeChild(wrapper);
      } else if (firstImage.parentNode) {
        firstImage.parentNode.removeChild(firstImage);
      }
    }
  }

  function init() {
    buildToc();
    fixFeaturedImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
