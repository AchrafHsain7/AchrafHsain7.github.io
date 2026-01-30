/* ==========================================================================
   Advanced Academic Hero Animation
   
   Features:
   - MDP Network: States, transitions, reward signals
   - Floating Mathematical Formulas: Bellman, entropy, gradients
   - Optimization Landscape: Contour lines with gradient descent
   - Cybernetic Elements: Feedback loops, information flow
   - Probability Clouds: Gaussian distributions
   ========================================================================== */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICAL FORMULAS - Core RL/ML/Information Theory equations
  // ═══════════════════════════════════════════════════════════════════════════
  
  const FORMULAS = [
    // Bellman equations
    'V(s) = max_a Q(s,a)',
    'Q(s,a) = R + γ·V(s\')',
    'V*(s) = max_a Σ P(s\'|s,a)[R + γV*(s\')]',
    
    // Policy gradient
    '∇J(θ) = 𝔼[∇log π_θ · R]',
    'π*(a|s) = argmax Q*(s,a)',
    
    // Information theory
    'H(X) = -Σ p(x)log p(x)',
    'I(X;Y) = H(X) - H(X|Y)',
    'D_KL(P||Q) = Σ P log(P/Q)',
    
    // Optimization
    'θ ← θ - α∇L(θ)',
    'L = 𝔼[(y - ŷ)²]',
    'min_θ 𝔼[L(f_θ(x), y)]',
    
    // Probability
    'p(x|θ) = N(μ, σ²)',
    'P(A|B) = P(B|A)P(A)/P(B)',
    '𝔼[X] = Σ x·p(x)',
    
    // Game theory
    'Nash: ∀i, u_i(s*) ≥ u_i(s)',
    'minimax: max_x min_y f(x,y)',
    
    // Decision theory
    'EU = Σ p(s)·U(s)',
    'argmax_a Σ P(s|a)U(s)',
    
    // Temporal difference
    'δ = r + γV(s\') - V(s)',
    'TD(0): V(s) ← V(s) + αδ',
    
    // Entropy regularization
    'J = 𝔼[R] + βH(π)',
    'π ∝ exp(Q/τ)',
    
    // Additional
    'A(s,a) = Q(s,a) - V(s)',
    'ρ(π) = lim 𝔼[Σγᵗrₜ]',
    '∂L/∂w = δ·∂Q/∂w'
  ];

  // Color schemes
  const COLORS = {
    dark: {
      state: '#00d4ff',
      stateGlow: 'rgba(0, 212, 255, 0.3)',
      stateDim: 'rgba(0, 212, 255, 0.15)',
      reward: '#ffb800',
      rewardGlow: 'rgba(255, 184, 0, 0.4)',
      value: '#a855f7',
      valueGlow: 'rgba(168, 85, 247, 0.3)',
      valueDim: 'rgba(168, 85, 247, 0.15)',
      action: '#10b981',
      actionDim: 'rgba(16, 185, 129, 0.15)',
      formula: 'rgba(230, 237, 243, 0.12)',
      formulaHighlight: 'rgba(0, 212, 255, 0.25)',
      grid: 'rgba(30, 42, 58, 0.4)',
      contour: 'rgba(168, 85, 247, 0.15)',
      contourLine: 'rgba(168, 85, 247, 0.3)',
      background: '#0a0e14',
      particle: 'rgba(0, 212, 255, 0.6)'
    },
    light: {
      state: '#0096c8',
      stateGlow: 'rgba(0, 150, 200, 0.25)',
      stateDim: 'rgba(0, 150, 200, 0.1)',
      reward: '#d97706',
      rewardGlow: 'rgba(217, 119, 6, 0.35)',
      value: '#7c3aed',
      valueGlow: 'rgba(124, 58, 237, 0.25)',
      valueDim: 'rgba(124, 58, 237, 0.1)',
      action: '#059669',
      actionDim: 'rgba(5, 150, 105, 0.1)',
      formula: 'rgba(26, 31, 38, 0.08)',
      formulaHighlight: 'rgba(0, 150, 200, 0.15)',
      grid: 'rgba(209, 217, 224, 0.5)',
      contour: 'rgba(124, 58, 237, 0.1)',
      contourLine: 'rgba(124, 58, 237, 0.2)',
      background: '#fafbfc',
      particle: 'rgba(0, 150, 200, 0.5)'
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FLOATING FORMULA CLASS
  // ═══════════════════════════════════════════════════════════════════════════
  
  class FloatingFormula {
    constructor(canvas, formula) {
      this.canvas = canvas;
      this.formula = formula;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.opacity = 0;
      this.targetOpacity = 0.08 + Math.random() * 0.08;
      this.fadeIn = true;
      this.life = 800 + Math.random() * 400;
      this.age = 0;
      this.scale = 0.7 + Math.random() * 0.4;
      this.rotation = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;

      // Fade in/out
      if (this.fadeIn && this.opacity < this.targetOpacity) {
        this.opacity += 0.002;
      }
      if (this.age > this.life * 0.7) {
        this.opacity -= 0.002;
        this.fadeIn = false;
      }

      // Reset when faded or off screen
      if (this.opacity <= 0 || this.x < -200 || this.x > this.canvas.width + 200 ||
          this.y < -50 || this.y > this.canvas.height + 50) {
        this.reset();
      }
    }

    draw(ctx, colors) {
      if (this.opacity <= 0) return;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(this.scale, this.scale);
      
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = colors.formula.replace(/[\d.]+\)$/, `${this.opacity})`);
      ctx.textAlign = 'center';
      ctx.fillText(this.formula, 0, 0);
      
      ctx.restore();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MDP STATE NODE CLASS
  // ═══════════════════════════════════════════════════════════════════════════
  
  class StateNode {
    constructor(canvas, index) {
      this.canvas = canvas;
      this.index = index;
      this.reset();
    }

    reset() {
      this.x = 100 + Math.random() * (this.canvas.width - 200);
      this.y = 100 + Math.random() * (this.canvas.height - 200);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = 5 + Math.random() * 4;
      this.value = Math.random();
      this.isTerminal = Math.random() < 0.12;
      this.rewardPulse = 0;
      this.phase = Math.random() * Math.PI * 2;
    }

    update(time) {
      // Gentle floating
      this.x += this.vx + Math.sin(time * 0.0008 + this.phase) * 0.15;
      this.y += this.vy + Math.cos(time * 0.0008 + this.phase) * 0.15;

      // Boundaries
      const pad = 80;
      if (this.x < pad || this.x > this.canvas.width - pad) this.vx *= -0.9;
      if (this.y < pad || this.y > this.canvas.height - pad) this.vy *= -0.9;
      this.x = Math.max(pad, Math.min(this.canvas.width - pad, this.x));
      this.y = Math.max(pad, Math.min(this.canvas.height - pad, this.y));

      if (this.rewardPulse > 0) this.rewardPulse *= 0.94;
    }

    triggerReward() {
      this.rewardPulse = 1;
    }

    draw(ctx, colors, time) {
      const pulse = 1 + Math.sin(time * 0.002 + this.phase) * 0.08;
      const r = this.radius * pulse;

      // Outer glow
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 3);
      
      if (this.rewardPulse > 0) {
        gradient.addColorStop(0, colors.reward.replace(')', `, ${0.5 * this.rewardPulse})`).replace('rgb', 'rgba'));
        gradient.addColorStop(1, 'transparent');
      } else if (this.isTerminal) {
        gradient.addColorStop(0, colors.valueDim);
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, colors.stateDim);
        gradient.addColorStop(1, 'transparent');
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.rewardPulse > 0 ? colors.reward : 
                      this.isTerminal ? colors.value : colors.state;
      ctx.globalAlpha = 0.4 + this.value * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Bright center
      ctx.beginPath();
      ctx.arc(this.x, this.y, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = this.rewardPulse > 0 ? colors.reward : 
                      this.isTerminal ? colors.value : colors.state;
      ctx.fill();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // OPTIMIZATION PARTICLE (Gradient Descent Point)
  // ═══════════════════════════════════════════════════════════════════════════
  
  class OptimizationParticle {
    constructor(canvas, landscapeCenter) {
      this.canvas = canvas;
      this.center = landscapeCenter;
      this.reset();
    }

    reset() {
      // Start at random position on the "loss landscape"
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 100;
      this.x = this.center.x + Math.cos(angle) * dist;
      this.y = this.center.y + Math.sin(angle) * dist;
      this.trail = [];
      this.speed = 0.3 + Math.random() * 0.4;
      this.noise = Math.random() * 0.5;
    }

    update() {
      // Move toward center (gradient descent toward minimum)
      const dx = this.center.x - this.x;
      const dy = this.center.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        // Add some noise (stochastic gradient)
        const noiseX = (Math.random() - 0.5) * this.noise;
        const noiseY = (Math.random() - 0.5) * this.noise;
        
        this.x += (dx / dist) * this.speed + noiseX;
        this.y += (dy / dist) * this.speed + noiseY;

        // Store trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 30) this.trail.shift();
      } else {
        // Reached minimum, reset
        this.reset();
      }
    }

    draw(ctx, colors) {
      // Draw trail
      if (this.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.strokeStyle = colors.actionDim;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.action;
      ctx.fill();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN ANIMATION CLASS
  // ═══════════════════════════════════════════════════════════════════════════
  
  class AcademicHeroAnimation {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.time = 0;
      this.isRunning = false;

      // Elements
      this.formulas = [];
      this.states = [];
      this.optimParticles = [];
      this.landscapeCenter = { x: 0, y: 0 };

      this.init();
    }

    getColors() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      return COLORS[theme] || COLORS.dark;
    }

    init() {
      this.resize();
      this.createElements();
      this.bindEvents();
      this.start();
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      
      // Update landscape center
      this.landscapeCenter = {
        x: this.canvas.width * 0.75,
        y: this.canvas.height * 0.65
      };
    }

    createElements() {
      // Floating formulas
      this.formulas = [];
      const formulaCount = Math.min(12, Math.floor(this.canvas.width / 120));
      const shuffled = [...FORMULAS].sort(() => Math.random() - 0.5);
      for (let i = 0; i < formulaCount; i++) {
        this.formulas.push(new FloatingFormula(this.canvas, shuffled[i % shuffled.length]));
      }

      // MDP states
      this.states = [];
      const stateCount = Math.min(25, Math.floor(this.canvas.width * this.canvas.height / 40000));
      for (let i = 0; i < stateCount; i++) {
        this.states.push(new StateNode(this.canvas, i));
      }

      // Optimization particles
      this.optimParticles = [];
      for (let i = 0; i < 5; i++) {
        this.optimParticles.push(new OptimizationParticle(this.canvas, this.landscapeCenter));
      }
    }

    drawGrid(colors) {
      const gridSize = 50;
      this.ctx.strokeStyle = colors.grid;
      this.ctx.lineWidth = 0.5;

      for (let x = 0; x < this.canvas.width; x += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();
      }
      for (let y = 0; y < this.canvas.height; y += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.stroke();
      }
    }

    drawOptimizationLandscape(colors) {
      const cx = this.landscapeCenter.x;
      const cy = this.landscapeCenter.y;

      // Draw contour lines (loss landscape)
      for (let r = 20; r <= 140; r += 25) {
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, r * 1.3, r, 0.3, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.contourLine;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }

      // Mark minimum
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = colors.value;
      this.ctx.fill();

      // Label
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = colors.formula.replace(/[\d.]+\)$/, '0.3)');
      this.ctx.fillText('θ*', cx + 8, cy + 4);
    }

    drawConnections(colors) {
      // Draw MDP transitions
      for (let i = 0; i < this.states.length; i++) {
        for (let j = i + 1; j < this.states.length; j++) {
          const s1 = this.states[i];
          const s2 = this.states[j];
          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && dist > 40) {
            // Connection line
            this.ctx.beginPath();
            this.ctx.moveTo(s1.x, s1.y);
            this.ctx.lineTo(s2.x, s2.y);
            this.ctx.strokeStyle = colors.stateDim;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Directional arrow
            const midX = s1.x + dx * 0.6;
            const midY = s1.y + dy * 0.6;
            const angle = Math.atan2(dy, dx);
            const arrowSize = 5;

            this.ctx.beginPath();
            this.ctx.moveTo(midX, midY);
            this.ctx.lineTo(
              midX - arrowSize * Math.cos(angle - 0.4),
              midY - arrowSize * Math.sin(angle - 0.4)
            );
            this.ctx.lineTo(
              midX - arrowSize * Math.cos(angle + 0.4),
              midY - arrowSize * Math.sin(angle + 0.4)
            );
            this.ctx.closePath();
            this.ctx.fillStyle = colors.stateDim;
            this.ctx.fill();
          }
        }
      }
    }

    drawFeedbackLoop(colors) {
      // Cybernetic feedback loop in corner
      const cx = 120;
      const cy = this.canvas.height - 100;
      const r = 35;

      // Circular arrow
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0.5, Math.PI * 1.8);
      this.ctx.strokeStyle = colors.stateDim;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Arrowhead
      const endAngle = Math.PI * 1.8;
      const ax = cx + Math.cos(endAngle) * r;
      const ay = cy + Math.sin(endAngle) * r;
      this.ctx.beginPath();
      this.ctx.moveTo(ax, ay);
      this.ctx.lineTo(ax + 8, ay - 4);
      this.ctx.lineTo(ax + 4, ay + 6);
      this.ctx.closePath();
      this.ctx.fillStyle = colors.state;
      this.ctx.fill();

      // Labels
      this.ctx.font = '9px "JetBrains Mono", monospace';
      this.ctx.fillStyle = colors.formula.replace(/[\d.]+\)$/, '0.2)');
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Agent', cx, cy - 45);
      this.ctx.fillText('↓ aₜ', cx + 45, cy);
      this.ctx.fillText('Environment', cx, cy + 55);
      this.ctx.fillText('sₜ, rₜ ↑', cx - 45, cy);
    }

    drawProbabilityCloud(colors, x, y, time) {
      // Gaussian-like probability visualization
      const phase = time * 0.001;
      
      for (let i = 0; i < 3; i++) {
        const offset = i * 0.3;
        const r = 20 + i * 15;
        const opacity = 0.08 - i * 0.02;
        
        this.ctx.beginPath();
        this.ctx.ellipse(
          x + Math.sin(phase + offset) * 5,
          y + Math.cos(phase + offset) * 3,
          r * 1.5,
          r,
          phase * 0.1,
          0, Math.PI * 2
        );
        this.ctx.fillStyle = colors.valueDim.replace(/[\d.]+\)$/, `${opacity})`);
        this.ctx.fill();
      }

      // μ marker
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = colors.formula.replace(/[\d.]+\)$/, '0.15)');
      this.ctx.textAlign = 'center';
      this.ctx.fillText('μ', x, y + 4);
    }

    draw() {
      const colors = this.getColors();

      // Clear
      this.ctx.fillStyle = colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Grid
      this.drawGrid(colors);

      // Optimization landscape
      this.drawOptimizationLandscape(colors);

      // Probability clouds
      this.drawProbabilityCloud(colors, this.canvas.width * 0.2, this.canvas.height * 0.3, this.time);
      this.drawProbabilityCloud(colors, this.canvas.width * 0.85, this.canvas.height * 0.25, this.time + 1000);

      // Floating formulas (behind states)
      this.formulas.forEach(f => {
        f.update();
        f.draw(this.ctx, colors);
      });

      // MDP connections
      this.drawConnections(colors);

      // MDP states
      this.states.forEach(s => {
        s.update(this.time);
        s.draw(this.ctx, colors, this.time);
      });

      // Optimization particles
      this.optimParticles.forEach(p => {
        p.update();
        p.draw(this.ctx, colors);
      });

      // Feedback loop
      this.drawFeedbackLoop(colors);

      this.time += 16;
    }

    animate() {
      if (!this.isRunning) return;
      this.draw();
      requestAnimationFrame(() => this.animate());
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      this.isRunning = false;
    }

    bindEvents() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.resize();
          this.createElements();
        }, 250);
      });

      document.addEventListener('visibilitychange', () => {
        document.hidden ? this.stop() : this.start();
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting ? this.start() : this.stop());
      }, { threshold: 0.1 });
      observer.observe(this.canvas);

      // Random rewards
      setInterval(() => {
        if (this.isRunning && this.states.length > 0) {
          const s = this.states[Math.floor(Math.random() * this.states.length)];
          if (Math.random() < 0.25) s.triggerReward();
        }
      }, 2500);
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-particles');
    if (canvas) new AcademicHeroAnimation('hero-particles');
  });

  window.AcademicHeroAnimation = AcademicHeroAnimation;
})();
