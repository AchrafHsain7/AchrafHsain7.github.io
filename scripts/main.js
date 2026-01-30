/* ==========================================================================
   Main JavaScript
   Theme toggle, mobile navigation, and general functionality
   ========================================================================== */

(function() {
  'use strict';

  /* ==========================================================================
     Theme Management
     ========================================================================== */

  const THEME_KEY = 'achraf-hsain-theme';
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setTheme(theme) {
    // Add transition class for smooth color changes
    document.documentElement.classList.add('theme-transitioning');
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 200);
  }

  function initTheme() {
    const storedTheme = getStoredTheme();
    const theme = storedTheme || getSystemTheme();
    
    // Set theme without transition on initial load
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

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

    // Close on background click
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  /* ==========================================================================
     Theme Toggle Button
     ========================================================================== */

  function initThemeToggle() {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  /* ==========================================================================
     Active Navigation Link
     ========================================================================== */

  function initActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Handle home page
      if ((currentPath === '/' || currentPath.endsWith('/index.html')) && 
          (href === '/' || href === 'index.html' || href === './')) {
        link.classList.add('nav__link--active', 'nav__mobile-link--active');
      }
      // Handle other pages
      else if (href && currentPath.includes(href.replace('.html', '').replace('./', ''))) {
        link.classList.add('nav__link--active', 'nav__mobile-link--active');
      }
    });
  }

  /* ==========================================================================
     Smooth Scroll for Anchor Links
     ========================================================================== */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ==========================================================================
     Card Click Handler (for clickable cards)
     ========================================================================== */

  function initCardClicks() {
    const clickableCards = document.querySelectorAll('.card--clickable');
    
    clickableCards.forEach(card => {
      const mainLink = card.querySelector('a[data-card-link]');
      if (!mainLink) return;

      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on a button or link inside the card
        if (e.target.closest('a, button')) return;
        
        // Navigate to the main link
        window.location.href = mainLink.href;
      });
    });
  }

  /* ==========================================================================
     Copy BibTeX Functionality
     ========================================================================== */

  function initBibtexCopy() {
    const bibtexBtns = document.querySelectorAll('[data-bibtex]');
    
    bibtexBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const bibtex = btn.getAttribute('data-bibtex');
        
        try {
          await navigator.clipboard.writeText(bibtex);
          
          // Visual feedback
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('btn--success');
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('btn--success');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy BibTeX:', err);
        }
      });
    });
  }

  /* ==========================================================================
     Initialize
     ========================================================================== */

  // Initialize theme before DOM is fully loaded to prevent flash
  initTheme();

  // Initialize everything else when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initActiveNavLink();
    initSmoothScroll();
    initCardClicks();
    initBibtexCopy();
  });

})();
