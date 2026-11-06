(function () {
  'use strict';

  var article = document.querySelector('.lkk-article-body');
  var toc = document.querySelector('.lkk-article-toc');
  var list = toc && toc.querySelector('ol');

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
