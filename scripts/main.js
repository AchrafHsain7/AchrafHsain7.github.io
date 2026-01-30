/* ==========================================================================
   Main JavaScript
   Theme toggle, mobile navigation, and general functionality
   ========================================================================== */

(function() {
  'use strict';

  /* ==========================================================================
     Theme Toggle Button
     ========================================================================== */

  function initThemeToggle() {
    document.querySelectorAll('.theme-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (window.ThemeManager) {
          window.ThemeManager.toggle();
        }
      });
    });
  }

  /* ==========================================================================
     Mobile Navigation
     ========================================================================== */

  function initMobileNav() {
    const menuBtn = document.querySelector('.nav__menu-btn');
    const mobileNav = document.querySelector('.nav__mobile');
    const closeBtn = document.querySelector('.nav__mobile-close');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    if (!menuBtn || !mobileNav) return;

    function openMobileNav() {
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobileNav() {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', openMobileNav);
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileNav);
    }

    mobileNav.addEventListener('click', function(e) {
      if (e.target === mobileNav) closeMobileNav();
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  /* ==========================================================================
     Active Navigation Link
     ========================================================================== */

  function initActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      
      if ((currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/')) && 
          (href === '/' || href === 'index.html' || href === './')) {
        link.classList.add('nav__link--active', 'nav__mobile-link--active');
      }
      else if (href && currentPath.includes(href.replace('.html', '').replace('./', ''))) {
        link.classList.add('nav__link--active', 'nav__mobile-link--active');
      }
    });
  }

  /* ==========================================================================
     Card Click Handler
     ========================================================================== */

  function initCardClicks() {
    document.querySelectorAll('.card--clickable').forEach(function(card) {
      const dataLink = card.getAttribute('data-link');
      if (!dataLink) return;

      card.addEventListener('click', function(e) {
        if (e.target.closest('a, button')) return;
        window.open(dataLink, '_blank', 'noopener,noreferrer');
      });
    });
  }

  /* ==========================================================================
     Copy BibTeX
     ========================================================================== */

  function initBibtexCopy() {
    document.querySelectorAll('[data-bibtex]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const bibtex = btn.getAttribute('data-bibtex');
        
        navigator.clipboard.writeText(bibtex).then(function() {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = original; }, 2000);
        });
      });
    });
  }

  /* ==========================================================================
     Initialize
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileNav();
    initActiveNavLink();
    initCardClicks();
    initBibtexCopy();
  });

})();
