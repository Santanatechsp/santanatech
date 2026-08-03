(function () {
  'use strict';

  async function loadComponent(selector, url) {
    const element = document.querySelector(selector);

    if (!element) {
      return;
    }

    try {
      const response = await fetch(url, {
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(
          'Erro HTTP ' + response.status + ' ao carregar ' + url
        );
      }

      element.innerHTML = await response.text();
    } catch (error) {
      console.error('Não foi possível carregar o componente:', error);

      element.innerHTML = `
        <div class="component-load-error">
          Não foi possível carregar esta parte da página.
        </div>
      `;
    }
  }

  function initializeMobileMenu() {
    const toggle = document.getElementById('globalMenuToggle');
    const menu = document.getElementById('globalMobileMenu');

    if (!toggle || !menu) {
      return;
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', function () {
      const isOpen =
        toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      menu.hidden = isOpen;

      document.body.classList.toggle(
        'menu-open',
        !isOpen
      );
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  function markCurrentPage() {
    let currentPath = window.location.pathname;

    if (!currentPath.endsWith('/')) {
      currentPath += '/';
    }

    document
      .querySelectorAll('[data-nav]')
      .forEach(function (link) {
        const linkPath = link.getAttribute('data-nav');

        if (linkPath === currentPath) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
  }

  function updateCurrentYear() {
    document
      .querySelectorAll('[data-current-year]')
      .forEach(function (element) {
        element.textContent =
          String(new Date().getFullYear());
      });
  }

  async function initializeComponents() {
    await Promise.all([
      loadComponent(
        '#site-header',
        '/components/header.html'
      ),
      loadComponent(
        '#site-footer',
        '/components/footer.html'
      )
    ]);

    initializeMobileMenu();
    markCurrentPage();
    updateCurrentYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initializeComponents
    );
  } else {
    initializeComponents();
  }
})();