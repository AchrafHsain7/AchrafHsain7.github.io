/* ==========================================================================
   Scroll Reveal Animation
   Uses Intersection Observer to animate elements as they enter viewport
   ========================================================================== */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class ScrollReveal {
    constructor(options = {}) {
      this.options = {
        selector: '.reveal',
        threshold: 0.2,
        rootMargin: '0px',
        once: true,
        ...options
      };

      this.init();
    }

    init() {
      // If user prefers reduced motion, show all elements immediately
      if (prefersReducedMotion) {
        this.showAllElements();
        return;
      }

      // Check for Intersection Observer support
      if (!('IntersectionObserver' in window)) {
        this.showAllElements();
        return;
      }

      this.createObserver();
      this.observeElements();
    }

    createObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.revealElement(entry.target);
            
            if (this.options.once) {
              this.observer.unobserve(entry.target);
            }
          } else if (!this.options.once) {
            this.hideElement(entry.target);
          }
        });
      }, {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      });
    }

    observeElements() {
      const elements = document.querySelectorAll(this.options.selector);
      elements.forEach(el => {
        this.observer.observe(el);
      });
    }

    revealElement(element) {
      element.classList.add('is-revealed');
      
      // Dispatch custom event
      element.dispatchEvent(new CustomEvent('reveal', {
        bubbles: true,
        detail: { element }
      }));
    }

    hideElement(element) {
      element.classList.remove('is-revealed');
    }

    showAllElements() {
      const elements = document.querySelectorAll(this.options.selector);
      elements.forEach(el => {
        el.classList.add('is-revealed');
      });
    }

    // Method to refresh observer (useful after dynamic content is added)
    refresh() {
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observeElements();
    }

    // Method to destroy the observer
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Create the default scroll reveal instance
    const scrollReveal = new ScrollReveal({
      selector: '.reveal',
      threshold: 0.2,
      once: true
    });

    // Expose for potential external use
    window.scrollReveal = scrollReveal;
  });

  // Export class for external use
  window.ScrollReveal = ScrollReveal;

})();
