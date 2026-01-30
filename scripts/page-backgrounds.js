/* ==========================================================================
   Page Background Animations
   
   Subtle mathematical/RL themed backgrounds for each page:
   - About: Entropy/Information theory
   - Papers: Knowledge graph / citation network
   - Projects: Agent-environment interaction
   - CV: Trajectory optimization
   ========================================================================== */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const COLORS = {
    dark: {
      state: '#00d4ff',
      stateDim: 'rgba(0, 212, 255, 0.12)',
      reward: '#ffb800',
      rewardDim: 'rgba(255, 184, 0, 0.12)',
      value: '#a855f7',
      valueDim: 'rgba(168, 85, 247, 0.12)',
      action: '#10b981',
      actionDim: 'rgba(16, 185, 129, 0.12)',
      grid: 'rgba(30, 42, 58, 0.3)',
      text: 'rgba(230, 237, 243, 0.06)',
      line: 'rgba(0, 212, 255, 0.08)',
      background: '#0a0e14'
    },
    light: {
      state: '#0096c8',
      stateDim: 'rgba(0, 150, 200, 0.08)',
      reward: '#d97706',
      rewardDim: 'rgba(217, 119, 6, 0.08)',
      value: '#7c3aed',
      valueDim: 'rgba(124, 58, 237, 0.08)',
      action: '#059669',
      actionDim: 'rgba(5, 150, 105, 0.08)',
      grid: 'rgba(209, 217, 224, 0.4)',
      text: 'rgba(26, 31, 38, 0.04)',
      line: 'rgba(0, 150, 200, 0.06)',
      background: '#fafbfc'
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ABOUT PAGE: Entropy / Information Theory Theme
  // Floating entropy formulas, probability distributions morphing
  // ═══════════════════════════════════════════════════════════════════════════

  class EntropyBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.distributions = [];
      this.formulas = [
        'H(X) = -Σp·log(p)',
        'I(X;Y) = H(X) - H(X|Y)',
        'D_KL(P||Q)',
        'H(X,Y) = H(X) + H(Y|X)',
        'I(X;Y) ≤ min(H(X), H(Y))'
      ];
      this.init();
    }

    init() {
      this.resize();
      // Create floating entropy particles
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 3,
          entropy: Math.random(), // Higher = more chaotic movement
          phase: Math.random() * Math.PI * 2
        });
      }
      // Create probability distributions
      for (let i = 0; i < 3; i++) {
        this.distributions.push({
          x: 150 + Math.random() * (this.canvas.width - 300),
          y: 150 + Math.random() * (this.canvas.height - 300),
          bars: this.generateDistribution(),
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    generateDistribution() {
      const n = 5 + Math.floor(Math.random() * 4);
      const bars = [];
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const v = Math.random();
        bars.push(v);
        sum += v;
      }
      return bars.map(v => v / sum); // Normalize
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    draw(time, colors) {
      this.ctx.fillStyle = colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw probability distributions
      this.distributions.forEach((dist, idx) => {
        const barWidth = 8;
        const maxHeight = 40;
        const totalWidth = dist.bars.length * (barWidth + 2);
        
        dist.bars.forEach((prob, i) => {
          const phase = time * 0.001 + dist.phase + i * 0.2;
          const heightMod = 1 + Math.sin(phase) * 0.2;
          const h = prob * maxHeight * heightMod;
          const x = dist.x - totalWidth / 2 + i * (barWidth + 2);
          const y = dist.y;
          
          this.ctx.fillStyle = idx === 0 ? colors.stateDim : 
                               idx === 1 ? colors.valueDim : colors.rewardDim;
          this.ctx.fillRect(x, y - h, barWidth, h);
        });

        // Label
        this.ctx.font = '9px "JetBrains Mono", monospace';
        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('P(x)', dist.x, dist.y + 15);
      });

      // Draw entropy particles
      this.particles.forEach(p => {
        // Movement affected by entropy value
        const chaos = p.entropy * 0.5;
        p.x += p.vx + Math.sin(time * 0.002 + p.phase) * chaos;
        p.y += p.vy + Math.cos(time * 0.002 + p.phase) * chaos;

        // Wrap around
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.stateDim;
        this.ctx.fill();
      });

      // Draw floating formulas
      this.formulas.forEach((f, i) => {
        const x = 100 + (i * 250) % (this.canvas.width - 200);
        const y = 80 + Math.floor(i / 3) * 200 + Math.sin(time * 0.0005 + i) * 20;
        
        this.ctx.font = '11px "JetBrains Mono", monospace';
        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(f, x, y);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAPERS PAGE: Citation Network / Knowledge Graph Theme
  // ═══════════════════════════════════════════════════════════════════════════

  class KnowledgeGraphBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.nodes = [];
      this.init();
    }

    init() {
      this.resize();
      // Create knowledge nodes
      for (let i = 0; i < 15; i++) {
        this.nodes.push({
          x: 50 + Math.random() * (this.canvas.width - 100),
          y: 50 + Math.random() * (this.canvas.height - 100),
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: 4 + Math.random() * 4,
          citations: Math.floor(Math.random() * 5), // Connections
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    draw(time, colors) {
      this.ctx.fillStyle = colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and draw connections first
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            // Draw citation arrow
            this.ctx.beginPath();
            this.ctx.moveTo(n1.x, n1.y);
            this.ctx.lineTo(n2.x, n2.y);
            this.ctx.strokeStyle = colors.line;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Animated dot along connection (knowledge flow)
            const progress = (time * 0.0003 + i * 0.1) % 1;
            const dotX = n1.x + dx * progress;
            const dotY = n1.y + dy * progress;
            
            this.ctx.beginPath();
            this.ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.stateDim;
            this.ctx.fill();
          }
        }
      }

      // Update and draw nodes
      this.nodes.forEach(n => {
        n.x += n.vx + Math.sin(time * 0.0008 + n.phase) * 0.1;
        n.y += n.vy + Math.cos(time * 0.0008 + n.phase) * 0.1;

        // Boundaries
        if (n.x < 30 || n.x > this.canvas.width - 30) n.vx *= -1;
        if (n.y < 30 || n.y > this.canvas.height - 30) n.vy *= -1;

        // Node glow
        const gradient = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 3);
        gradient.addColorStop(0, colors.valueDim);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Node core
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.valueDim;
        this.ctx.fill();
      });

      // Draw "papers" labels
      const labels = ['∂L/∂θ', 'argmax', 'Σ', '∇', 'π(a|s)', '𝔼[R]'];
      labels.forEach((label, i) => {
        const x = 80 + (i * 200) % (this.canvas.width - 100);
        const y = 60 + Math.floor(i / 4) * 250;
        
        this.ctx.font = '10px "JetBrains Mono", monospace';
        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, x, y);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJECTS PAGE: Agent-Environment Interaction Theme
  // ═══════════════════════════════════════════════════════════════════════════

  class AgentEnvBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.agents = [];
      this.envBlocks = [];
      this.init();
    }

    init() {
      this.resize();
      // Create agents
      for (let i = 0; i < 5; i++) {
        this.agents.push({
          x: 100 + Math.random() * (this.canvas.width - 200),
          y: 100 + Math.random() * (this.canvas.height - 200),
          targetX: 0,
          targetY: 0,
          phase: Math.random() * Math.PI * 2,
          state: 'exploring'
        });
        this.setNewTarget(this.agents[i]);
      }
      // Environment blocks (obstacles/goals)
      for (let i = 0; i < 8; i++) {
        this.envBlocks.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: 20 + Math.random() * 30,
          type: Math.random() < 0.3 ? 'goal' : 'state'
        });
      }
    }

    setNewTarget(agent) {
      agent.targetX = 50 + Math.random() * (this.canvas.width - 100);
      agent.targetY = 50 + Math.random() * (this.canvas.height - 100);
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    draw(time, colors) {
      this.ctx.fillStyle = colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw environment blocks
      this.envBlocks.forEach(block => {
        this.ctx.beginPath();
        this.ctx.rect(block.x - block.size/2, block.y - block.size/2, block.size, block.size);
        this.ctx.strokeStyle = block.type === 'goal' ? colors.rewardDim : colors.stateDim;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        if (block.type === 'goal') {
          this.ctx.fillStyle = colors.rewardDim;
          this.ctx.fill();
        }
      });

      // Draw agents and their trajectories
      this.agents.forEach((agent, idx) => {
        // Move toward target
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
          agent.x += (dx / dist) * 0.5;
          agent.y += (dy / dist) * 0.5;
        } else {
          this.setNewTarget(agent);
        }

        // Trail
        this.ctx.beginPath();
        this.ctx.moveTo(agent.x, agent.y);
        this.ctx.lineTo(agent.targetX, agent.targetY);
        this.ctx.strokeStyle = colors.actionDim;
        this.ctx.setLineDash([4, 4]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Agent
        this.ctx.beginPath();
        this.ctx.arc(agent.x, agent.y, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.actionDim;
        this.ctx.fill();

        // Direction indicator
        const angle = Math.atan2(dy, dx);
        this.ctx.beginPath();
        this.ctx.moveTo(agent.x + Math.cos(angle) * 10, agent.y + Math.sin(angle) * 10);
        this.ctx.lineTo(agent.x + Math.cos(angle - 0.5) * 6, agent.y + Math.sin(angle - 0.5) * 6);
        this.ctx.lineTo(agent.x + Math.cos(angle + 0.5) * 6, agent.y + Math.sin(angle + 0.5) * 6);
        this.ctx.closePath();
        this.ctx.fillStyle = colors.action;
        this.ctx.globalAlpha = 0.3;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
      });

      // Labels
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = colors.text;
      this.ctx.textAlign = 'center';
      this.ctx.fillText('s → a → s\' → r', this.canvas.width / 2, 40);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CV PAGE: Trajectory Optimization Theme
  // Career as gradient ascent on the value landscape
  // ═══════════════════════════════════════════════════════════════════════════

  class TrajectoryBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.contours = [];
      this.init();
    }

    init() {
      this.resize();
      // Optimization particles
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          trail: [],
          targetX: this.canvas.width * 0.7,
          targetY: this.canvas.height * 0.3,
          speed: 0.2 + Math.random() * 0.3
        });
      }
      // Contour levels
      for (let i = 1; i <= 5; i++) {
        this.contours.push({
          rx: i * 60,
          ry: i * 40,
          rotation: 0.2
        });
      }
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    draw(time, colors) {
      this.ctx.fillStyle = colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const centerX = this.canvas.width * 0.7;
      const centerY = this.canvas.height * 0.35;

      // Draw contour lines
      this.contours.forEach((c, i) => {
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, c.rx, c.ry, c.rotation, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.valueDim;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      });

      // Draw optimum marker
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = colors.rewardDim;
      this.ctx.fill();

      this.ctx.font = '9px "JetBrains Mono", monospace';
      this.ctx.fillStyle = colors.text;
      this.ctx.textAlign = 'center';
      this.ctx.fillText('θ*', centerX, centerY + 20);

      // Update and draw particles (gradient ascent)
      this.particles.forEach(p => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10) {
          // Add noise (stochastic)
          const noise = 0.3;
          p.x += (dx / dist) * p.speed + (Math.random() - 0.5) * noise;
          p.y += (dy / dist) * p.speed + (Math.random() - 0.5) * noise;

          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 50) p.trail.shift();
        } else {
          // Reset
          p.x = Math.random() * this.canvas.width;
          p.y = this.canvas.height * 0.7 + Math.random() * this.canvas.height * 0.3;
          p.trail = [];
        }

        // Draw trail
        if (p.trail.length > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          this.ctx.strokeStyle = colors.actionDim;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }

        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.action;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
      });

      // Timeline markers on left side
      const milestones = ['t₀', 't₁', 't₂', 't₃'];
      milestones.forEach((m, i) => {
        const y = 100 + i * 120;
        
        this.ctx.beginPath();
        this.ctx.arc(40, y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.stateDim;
        this.ctx.fill();

        if (i < milestones.length - 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(40, y + 8);
          this.ctx.lineTo(40, y + 112);
          this.ctx.strokeStyle = colors.line;
          this.ctx.setLineDash([3, 3]);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
        }

        this.ctx.font = '9px "JetBrains Mono", monospace';
        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(m, 50, y + 4);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN CONTROLLER
  // ═══════════════════════════════════════════════════════════════════════════

  class PageBackground {
    constructor(canvasId, theme) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.theme = theme;
      this.isRunning = false;
      this.animation = null;

      switch (theme) {
        case 'entropy':
          this.animation = new EntropyBackground(this.canvas);
          break;
        case 'knowledge':
          this.animation = new KnowledgeGraphBackground(this.canvas);
          break;
        case 'agent':
          this.animation = new AgentEnvBackground(this.canvas);
          break;
        case 'trajectory':
          this.animation = new TrajectoryBackground(this.canvas);
          break;
      }

      if (this.animation) {
        this.bindEvents();
        this.start();
      }
    }

    getColors() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      return COLORS[theme] || COLORS.dark;
    }

    draw(time) {
      if (!this.isRunning || !this.animation) return;
      this.animation.draw(time, this.getColors());
      requestAnimationFrame((t) => this.draw(t));
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      requestAnimationFrame((t) => this.draw(t));
    }

    stop() {
      this.isRunning = false;
    }

    bindEvents() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.animation.resize();
          this.animation.init();
        }, 250);
      });

      document.addEventListener('visibilitychange', () => {
        document.hidden ? this.stop() : this.start();
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting ? this.start() : this.stop());
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }
  }

  // Initialize based on page
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('page-background');
    if (!canvas) return;

    const theme = canvas.getAttribute('data-theme');
    if (theme) {
      new PageBackground('page-background', theme);
    }
  });

  window.PageBackground = PageBackground;
})();
