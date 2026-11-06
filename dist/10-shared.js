(function () {
  function initHeaderLayout() {
    var ticker = document.getElementById('lkk-breaking');
    var headerInner = document.querySelector('.lkk-header-inner');
    var search = headerInner && headerInner.querySelector('.lkk-header-search');
    if (ticker && search && headerInner) {
      headerInner.insertBefore(ticker, search);
    }
  }

  function setupNav() {
    var nav = document.querySelector('.lkk-main-nav');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(function (link) {
      if (link.getAttribute('href') === '#') {
        link.setAttribute('tabindex', '-1');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeaderLayout();
      setupNav();
    });
  } else {
    initHeaderLayout();
    setupNav();
  }
})();
