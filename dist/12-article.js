(function () {
  function formatDate(dateElement) {
    if (!dateElement || !dateElement.dateTime || !window.Intl) return;
    var date = new Date(dateElement.dateTime);
    if (isNaN(date.getTime())) return;
    dateElement.textContent = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta'
    }).format(date);
  }

  function buildToc() {
    var article = document.querySelector('.lkk-article-body');
    var toc = document.querySelector('.lkk-article-toc');
    var list = toc && toc.querySelector('ol');
    if (!article || !toc || !list) return;

    var headings = article.querySelectorAll('h2, h3, h4, h5, h6');
    for (var i = 0; i < headings.length; i += 1) {
      var heading = headings[i];
      var text = heading.textContent.replace(/\s+/g, ' ').trim();
      if (!text) continue;

      var id = heading.id;
      if (!id || document.getElementById(id) !== heading) {
        var base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'bagian-' + (i + 1);
        id = base;
        var suffix = 2;
        while (document.getElementById(id)) {
          id = base + '-' + suffix;
          suffix += 1;
        }
        heading.id = id;
      }

      var item = document.createElement('li');
      var link = document.createElement('a');
      item.className = 'lkk-toc-level-' + heading.tagName.slice(1);
      link.href = '#' + id;
      link.textContent = text;
      item.appendChild(link);
      list.appendChild(item);
    }

    if (list.children.length) toc.hidden = false;
  }

  function enrichImageAltText() {
    var article = document.querySelector('.lkk-article-body');
    if (!article) return;

    var articleTitle = document.querySelector('.lkk-article-title');
    var articleTitleText = articleTitle ? articleTitle.textContent.replace(/\s+/g, ' ').trim() : '';
    var featuredImage = document.querySelector('.lkk-article-featured-image');
    var contentImages = article.querySelectorAll('img');

    for (var i = 0; i < contentImages.length; i += 1) {
      var image = contentImages[i];
      var currentAlt = image.getAttribute('alt');
      var currentTitle = image.getAttribute('title');
      var captionContainer = image.closest ? image.closest('figure, .separator, .tr-caption-container') : null;
      var caption = captionContainer ? captionContainer.querySelector('figcaption, .tr-caption, .caption') : null;
      var captionText = caption ? caption.textContent.replace(/\s+/g, ' ').trim() : '';
      var imageContext = captionText || (currentTitle ? currentTitle.replace(/\s+/g, ' ').trim() : '');
      var automaticAlt = articleTitleText;

      if (imageContext && articleTitleText && imageContext.toLowerCase() !== articleTitleText.toLowerCase()) {
        automaticAlt = articleTitleText + ': ' + imageContext;
      }
      if ((!currentAlt || !currentAlt.trim()) && automaticAlt) {
        image.setAttribute('alt', automaticAlt);
      }
      if ((!currentTitle || !currentTitle.trim()) && articleTitleText) {
        image.setAttribute('title', articleTitleText + ' | Liputan Kabar Kota');
      }
      if (featuredImage && i === 0 && image.src && featuredImage.src && image.src.replace(/[?#].*$/, '').trim().toLowerCase() === featuredImage.src.replace(/[?#].*$/, '').trim().toLowerCase()) {
        if (!featuredImage.getAttribute('alt')) {
          featuredImage.setAttribute('alt', automaticAlt || articleTitleText);
        }
      }
    }
  }

  function init() {
    buildToc();
    enrichImageAltText();
    formatDate(document.querySelector('.lkk-post-published'));
    formatDate(document.querySelector('.lkk-post-modified'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
