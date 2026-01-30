/* ==========================================================================
   Typing Animation
   Hacker-style typing effect for hero section
   ========================================================================== */

(function() {
  'use strict';

  const NAME_TEXT = 'Achraf Hsain';
  const TITLE_TEXT = 'PhD Student · Reinforcement Learning';

  const CONFIG = {
    nameSpeed: 70,
    titleSpeed: 40,        // Faster for second line
    scrambleChars: 2,
    scrambleSpeed: 30,
    startDelay: 300,
    lineDelay: 300,
  };

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  function getRandomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  // Single shared cursor element
  let cursor = null;

  function createCursor() {
    if (!cursor) {
      cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '█';
    }
    return cursor;
  }

  function typeText(element, text, speed, callback) {
    let i = 0;
    let scramble = 0;
    const cur = createCursor();
    
    element.textContent = '';
    element.appendChild(cur);

    function tick() {
      if (i >= text.length) {
        cur.classList.add('typing-cursor--blink');
        if (callback) setTimeout(callback, CONFIG.lineDelay);
        return;
      }

      const char = text[i];
      
      if (scramble < CONFIG.scrambleChars && char !== ' ') {
        element.textContent = text.slice(0, i) + getRandomChar();
        element.appendChild(cur);
        scramble++;
        setTimeout(tick, CONFIG.scrambleSpeed);
      } else {
        element.textContent = text.slice(0, i + 1);
        element.appendChild(cur);
        i++;
        scramble = 0;
        setTimeout(tick, speed + (Math.random() - 0.5) * 20);
      }
    }

    cur.classList.remove('typing-cursor--blink');
    tick();
  }

  function init() {
    const name = document.querySelector('.hero__name');
    const title = document.querySelector('.hero__title');
    
    if (!name) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      name.textContent = NAME_TEXT;
      if (title) title.textContent = TITLE_TEXT;
      return;
    }

    setTimeout(() => {
      typeText(name, NAME_TEXT, CONFIG.nameSpeed, () => {
        if (title) {
          typeText(title, TITLE_TEXT, CONFIG.titleSpeed);
        }
      });
    }, CONFIG.startDelay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
