/* ==========================================================================
   Particle Animation for Hero Section
   Vanilla JavaScript canvas animation with floating dots and connecting lines
   ========================================================================== */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return; // Don't initialize particles if user prefers reduced motion
  }

  class Particle {
    constructor(canvas, options) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * options.speed;
      this.vy = (Math.random() - 0.5) * options.speed;
      this.radius = Math.random() * 2 + 1;
      this.options = options;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > this.canvas.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.vy = -this.vy;
      }

      // Keep particles in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class ParticleNetwork {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.isRunning = false;

      // Default options
      this.options = {
        particleCount: options.particleCount || 50,
        speed: options.speed || 0.3,
        connectionDistance: options.connectionDistance || 150,
        particleOpacity: options.particleOpacity || 0.3,
        lineOpacity: options.lineOpacity || 0.1,
        ...options
      };

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.bindEvents();
      this.start();
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.options.particleCount; i++) {
        this.particles.push(new Particle(this.canvas, this.options));
      }
    }

    getColor() {
      // Get the computed color from CSS custom properties
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      return theme === 'dark' ? '#6e7681' : '#8c959f';
    }

    drawConnections() {
      const color = this.getColor();
      
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.options.connectionDistance) {
            const opacity = (1 - distance / this.options.connectionDistance) * this.options.lineOpacity;
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.hexToRgba(color, opacity);
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }
    }

    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const color = this.getColor();
      
      // Draw particles
      this.ctx.fillStyle = this.hexToRgba(color, this.options.particleOpacity);
      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx);
      });

      // Draw connections
      this.drawConnections();
    }

    animate() {
      if (!this.isRunning) return;
      
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      this.isRunning = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    bindEvents() {
      // Handle resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.resize();
          this.createParticles();
        }, 250);
      });

      // Pause when tab is hidden to save resources
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });

      // Handle intersection observer for performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.start();
          } else {
            this.stop();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.canvas);
    }

    destroy() {
      this.stop();
      window.removeEventListener('resize', this.resize);
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const heroCanvas = document.getElementById('hero-particles');
    if (heroCanvas) {
      new ParticleNetwork('hero-particles', {
        particleCount: 50,
        speed: 0.3,
        connectionDistance: 150,
        particleOpacity: 0.3,
        lineOpacity: 0.1
      });
    }
  });

  // Export for potential external use
  window.ParticleNetwork = ParticleNetwork;

})();
