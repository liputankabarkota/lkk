(function () {
  'use strict';

  var article = document.querySelector('.lkk-article-body');
  var featured = document.querySelector('.lkk-article-featured-image');
  var articleHeading = document.querySelector('.lkk-article-title');
  var toc = document.querySelector('.lkk-article-toc');
  var list = toc && toc.querySelector('ol');

  if (article && featured) {
    var featuredFigure = featured.closest('figure');
    var articleTitle = articleHeading && articleHeading.textContent.trim();

    function imageKey(source) {
      var url = new URL(source, document.baseURI);
      var parts = url.pathname.split('/');
      var normalized = [];

      for (var i = 0; i < parts.length; i += 1) {
        if (parts[i] && !/^(?:s\d+(?:-.+)?|w\d+(?:-h\d+)?(?:-.+)?)$/.test(parts[i])) {
          normalized.push(parts[i]);
        }
      }

      return url.origin + '/' + normalized.join('/');
    }

    var featuredKey = imageKey(featured.currentSrc || featured.src);

    article.querySelectorAll('img').forEach(function (image) {
      if (imageKey(image.currentSrc || image.src) !== featuredKey) return;

      var wrapper = image.closest('figure, table.tr-caption-container');
      var link = image.closest('a');
      var caption = wrapper && wrapper.querySelector('figcaption, .tr-caption');

      if (!featured.getAttribute('alt') && image.getAttribute('alt')) {
        featured.alt = image.getAttribute('alt');
      }
      if (!featured.getAttribute('title') && image.getAttribute('title')) {
        featured.title = image.getAttribute('title');
      }
      if (caption && caption.textContent.trim() && featuredFigure &&
          !featuredFigure.querySelector('figcaption')) {
        var featuredCaption = document.createElement('figcaption');
        Array.prototype.forEach.call(caption.childNodes, function (node) {
          featuredCaption.appendChild(node.cloneNode(true));
        });
        while (featuredCaption.lastChild &&
            (featuredCaption.lastChild.nodeName === 'BR' ||
             (featuredCaption.lastChild.nodeType === 3 && !featuredCaption.lastChild.nodeValue.trim()))) {
          featuredCaption.removeChild(featuredCaption.lastChild);
        }
        featuredFigure.appendChild(featuredCaption);
      }

      if (link && link.querySelectorAll('img').length === 1 && !link.textContent.trim()) {
        link.remove();
      } else {
        image.remove();
      }

      if (wrapper && !wrapper.querySelector('img')) {
        wrapper.remove();
      }
    });

    if (!featured.getAttribute('alt')) {
      featured.alt = articleTitle || 'Foto artikel';
    }
    if (!featured.getAttribute('title')) {
      featured.title = articleTitle
        ? articleTitle + ' | Liputan Kabar Kota'
        : 'Liputan Kabar Kota';
    }
  }

  if (!article || !toc || !list) return;

  var headings = article.querySelectorAll('h2, h3');
  var usedIds = Object.create(null);

  headings.forEach(function (heading, index) {
    var title = heading.textContent.replace(/\s+/g, ' ').trim();
    if (!title) return;

    var base = heading.id || title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'bagian-' + (index + 1);
    var id = base;
    var suffix = 2;

    while (usedIds[id] || (document.getElementById(id) && document.getElementById(id) !== heading)) {
      id = base + '-' + suffix;
      suffix += 1;
    }

    usedIds[id] = true;
    heading.id = id;

    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#' + id;
    link.textContent = title;
    item.appendChild(link);
    list.appendChild(item);
  });

  if (list.children.length >= 3) {
    toc.hidden = false;
  } else {
    list.textContent = '';
  }
}());
