# Achraf Hsain - Academic Portfolio Website Specification

## Project Overview

**Goal:** Build a modern, sleek academic portfolio website for a PhD student. The site should feel scholarly but contemporary—not corporate, not hacker, not dusty professor. Clean but not sterile. Dark mode default but with an airy, approachable feel.

**Hosting:** GitHub Pages (static only, no backend)
**Stack:** Pure HTML, CSS, JavaScript (no frameworks, no npm dependencies)
**Build System:** Python script to generate pages from Markdown content files

**Design Philosophy:**
- Middle spectrum between conservative and bold, slightly nudged toward bold
- Modern academic researcher aesthetic
- Thoughtful with moments of delight
- Minimal maintenance overhead
- Highly modular for easy customization

---

## Color System

All colors must be defined as CSS custom properties in `:root` for easy theming.

### Dark Mode (Default)

```css
:root[data-theme="dark"] {
  --bg-primary:       #0d1117;      /* Main background */
  --bg-secondary:     #161b22;      /* Cards, elevated surfaces */
  --bg-tertiary:      #21262d;      /* Hover states, subtle highlights */
  
  --border-primary:   #30363d;      /* Main borders */
  --border-secondary: #484f58;      /* Emphasized borders */
  
  --text-primary:     #e6edf3;      /* Main text */
  --text-secondary:   #8b949e;      /* Muted text, metadata */
  --text-tertiary:    #6e7681;      /* Very muted, placeholders */
  
  --accent-primary:   #58a6ff;      /* Links, highlights, primary actions */
  --accent-secondary: #7ee787;      /* Tags, success states (optional) */
  --accent-hover:     #79c0ff;      /* Accent hover state */
  
  --glow-color:       rgba(88, 166, 255, 0.1);  /* Card hover glow */
  --shadow-color:     rgba(0, 0, 0, 0.3);       /* Drop shadows */
}
```

### Light Mode

```css
:root[data-theme="light"] {
  --bg-primary:       #ffffff;
  --bg-secondary:     #f6f8fa;
  --bg-tertiary:      #eaeef2;
  
  --border-primary:   #d0d7de;
  --border-secondary: #afb8c1;
  
  --text-primary:     #1f2328;
  --text-secondary:   #656d76;
  --text-tertiary:    #8c959f;
  
  --accent-primary:   #0969da;
  --accent-secondary: #1a7f37;
  --accent-hover:     #0550ae;
  
  --glow-color:       rgba(9, 105, 218, 0.08);
  --shadow-color:     rgba(0, 0, 0, 0.1);
}
```

---

## Typography

Fonts loaded from Google Fonts. Define all sizing as CSS custom properties.

### Font Families

```css
:root {
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --font-sans:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Font Scale

```css
:root {
  --text-xs:      0.75rem;    /* 12px - tags, labels */
  --text-sm:      0.875rem;   /* 14px - metadata, captions */
  --text-base:    1rem;       /* 16px - body text */
  --text-lg:      1.125rem;   /* 18px - lead paragraphs */
  --text-xl:      1.25rem;    /* 20px - card titles */
  --text-2xl:     1.5rem;     /* 24px - section subtitles */
  --text-3xl:     2rem;       /* 32px - section titles */
  --text-4xl:     2.5rem;     /* 40px - page titles */
  --text-5xl:     3.5rem;     /* 56px - hero name */
}
```

### Usage Rules

| Element | Font Family | Size | Weight | Color |
|---------|-------------|------|--------|-------|
| Hero name | mono | 5xl | 500 | primary |
| Page titles | mono | 4xl | 500 | primary |
| Section titles | mono | 3xl | 500 | primary |
| Card titles | mono | xl | 500 | primary |
| Body text | sans | base | 400 | primary |
| Lead/intro | sans | lg | 400 | primary |
| Metadata | sans | sm | 400 | secondary |
| Tags | mono | xs | 500 | accent, uppercase |
| Nav links | mono | sm | 500 | primary |

---

## Spacing System

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

---

## Layout & Breakpoints

```css
:root {
  --max-width:         1200px;
  --content-width:     65ch;       /* For readable text blocks */
  --nav-height:        4rem;
  --border-radius-sm:  0.375rem;   /* 6px */
  --border-radius-md:  0.5rem;     /* 8px */
  --border-radius-lg:  0.75rem;    /* 12px */
  --border-radius-xl:  1rem;       /* 16px */
}

/* Breakpoints (use in media queries) */
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

---

## Animation Specifications

### Timing & Easing

```css
:root {
  --transition-fast:    150ms ease;
  --transition-base:    200ms ease;
  --transition-slow:    300ms ease;
  --transition-slower:  500ms ease;
  
  --ease-out-expo:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back:      cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Animation Types

#### 1. Theme Transition
- All color properties transition smoothly on theme toggle
- Duration: 200ms
- Apply to: background-color, color, border-color, box-shadow

#### 2. Page Load
- Content fades in and slides up slightly
- Duration: 500ms
- Delay: stagger elements by 100ms
- Transform: translateY(20px) → translateY(0)
- Opacity: 0 → 1

#### 3. Scroll Reveal
- Elements fade in as they enter viewport
- Use Intersection Observer
- Trigger when 20% visible
- Same animation as page load
- Only animate once (not on scroll up)

#### 4. Card Hover
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--glow-color);
  border-color: var(--accent-primary);
}
```
- Duration: 200ms
- Ease: ease-out

#### 5. Link Underline Animation
```css
.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 200ms ease;
}
.link:hover::after {
  width: 100%;
}
```

#### 6. Button Press
```css
.button:active {
  transform: scale(0.98);
}
```

#### 7. Hero Particles Background
- Vanilla JavaScript canvas animation
- Subtle floating dots with faint connecting lines
- Low density: ~50 particles max
- Slow movement: 0.2-0.5px per frame
- Particle color: var(--text-tertiary) at 30% opacity
- Line color: var(--text-tertiary) at 10% opacity
- Connection distance: 150px
- Must respect `prefers-reduced-motion`: disable if set

#### 8. Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Site Structure

```
/
├── index.html          # Home - hero + intro + highlights
├── about.html          # Full bio, research interests, photo
├── papers.html         # Publication cards (generated)
├── projects.html       # Project cards (generated)
├── cv.html             # PDF embed + download
└── 404.html            # Custom error page
```

---

## Component Specifications

### 1. Navigation (Sticky Header)

```
┌────────────────────────────────────────────────────────┐
│  [A] Achraf Hsain          About  Papers  Projects  CV  [◐]  │
└────────────────────────────────────────────────────────┘
```

- Sticky, stays at top on scroll
- Background: `--bg-primary` with slight transparency + backdrop-blur
- Height: `--nav-height` (4rem)
- Border-bottom: 1px solid `--border-primary`
- Left: Logo/name (link to home)
- Right: Nav links + theme toggle button
- Mobile: Hamburger menu (slide-in drawer)
- Active page: indicated with `--accent-primary` color or underline

### 2. Theme Toggle Button

- Icon: Sun (☀) for light mode active, Moon (☾) for dark mode active
- Circular button, subtle border
- Smooth icon transition (fade or rotate)
- Saves preference to localStorage
- Respects `prefers-color-scheme` on first visit

### 3. Hero Section (Home Only)

```
┌─────────────────────────────────────────────────────────┐
│  [Canvas: Particle Animation Background]                │
│                                                         │
│            Achraf Hsain                                 │
│                                                         │
│    PhD Student · Machine Learning Researcher            │
│                                                         │
│    Brief tagline about research focus area              │
│                                                         │
│              ↓ (scroll indicator, animated)             │
└─────────────────────────────────────────────────────────┘
```

- Full viewport height minus nav
- Centered content
- Particles behind text (canvas positioned absolute)
- Scroll indicator: subtle bounce animation

### 4. Section Container

```css
.section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.section-title {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  margin-bottom: var(--space-8);
}
```

### 5. Paper Card

```
┌──────────────────────────────────────────────────────┐
│  ┌────────────┐                                      │
│  │            │  Paper Title Here                    │
│  │   IMAGE    │  A. Hsain, B. Collaborator, C. Name  │
│  │  (figure)  │  NeurIPS 2024                        │
│  │            │                                      │
│  └────────────┘  Abstract text goes here, limited    │
│                  to 2-3 lines with ellipsis...       │
│                                                      │
│                  [arXiv] [PDF] [Code] [BibTeX]       │
│                  └─ tag buttons, subtle ─┘           │
└──────────────────────────────────────────────────────┘
```

- Horizontal layout on desktop (image left, content right)
- Vertical stack on mobile (image top)
- Image: 200px × 150px, object-fit: cover, rounded corners
- Entire card clickable → links to arXiv/paper link
- Individual buttons for specific resources (stop propagation)
- Hover: lift + glow effect
- Tags below abstract (e.g., [RL] [Robotics])

### 6. Project Card

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │     PROJECT IMAGE     │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Project Title              │
│                             │
│  Brief description of the   │
│  project, 2-3 lines max...  │
│                             │
│  [tag] [tag] [tag]          │
│                             │
│  [Demo] [GitHub]            │
└─────────────────────────────┘
```

- 2-column grid on desktop, 1 column on mobile
- Image: 16:9 aspect ratio, full width of card
- Hover: same lift + glow as paper cards

### 7. Buttons & Links

**Primary Button:**
```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}
```

**Ghost Button:**
```css
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  /* same padding/radius */
}
.btn-ghost:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
```

**Text Link:**
- Color: `--accent-primary`
- Animated underline on hover (see animations)
- External links: add subtle arrow icon (→) that slides on hover

### 8. Tag/Chip

```css
.tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  color: var(--accent-primary);
  border-radius: var(--border-radius-sm);
}
```

### 9. Footer

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  © 2025 Achraf Hsain                                    │
│                                                         │
│  [GitHub] [Scholar] [LinkedIn] [Email]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Minimal, centered
- Social icons in a row (use simple SVG icons or Unicode)
- Subtle top border

---

## Page Layouts

### index.html (Home)

```
[Navigation]

[Hero Section - Full viewport]
  - Particle canvas background
  - Name (large, mono)
  - Title/affiliation
  - One-liner research focus
  - Scroll indicator

[Introduction Section]
  - 2-3 paragraph bio summary
  - "Read more →" link to about page

[Featured Work Section]
  - Title: "Featured"
  - 1-2 paper cards (marked as featured in data)
  - 1-2 project cards (marked as featured in data)
  - "View all papers →" / "View all projects →" links

[Contact Section]
  - Simple horizontal list of contact methods
  - Email (mailto link)
  - Social links (icons)

[Footer]
```

### about.html

```
[Navigation]

[Page Header]
  - Title: "About"

[About Section]
  - Layout: Photo on left (or top on mobile), text on right
  - Photo: 250px × 250px, rounded
  - Full bio (multiple paragraphs)
  
[Research Interests Section]
  - Title: "Research Interests"
  - Grid of tags or short descriptions
  
[Education Section] (optional, brief)
  - Simple list: Degree, Institution, Year
  
[Contact Section]
  - Email
  - Office location (if applicable)
  - Social links

[Footer]
```

### papers.html (Generated by Python)

```
[Navigation]

[Page Header]
  - Title: "Publications"
  - Optional: Filter buttons by year or tag

[Papers List]
  - All paper cards, reverse chronological order
  - Stacked vertically with spacing

[Footer]
```

### projects.html (Generated by Python)

```
[Navigation]

[Page Header]
  - Title: "Projects"

[Projects Grid]
  - 2-column grid on desktop
  - All project cards

[Footer]
```

### cv.html

```
[Navigation]

[Page Header]
  - Title: "CV"
  - Download button (prominent)

[PDF Embed]
  - Embedded PDF viewer
  - Full width, ~80vh height
  - Fallback text: "PDF not loading? Download directly."

[Footer]
```

### 404.html

```
[Navigation]

[Centered Content]
  - "404" (large, mono)
  - "Page not found"
  - "The page you're looking for doesn't exist."
  - [Go Home] button

[Footer]
```

---

## File Structure

```
/
├── index.html
├── about.html
├── papers.html                 # Generated by build.py
├── projects.html               # Generated by build.py
├── cv.html
├── 404.html
│
├── styles/
│   ├── variables.css           # All CSS custom properties
│   ├── reset.css               # CSS reset/normalize
│   ├── base.css                # Base element styles
│   ├── layout.css              # Grid, containers, sections
│   ├── components.css          # Cards, buttons, nav, footer
│   ├── utilities.css           # Helper classes
│   └── animations.css          # All keyframes and transitions
│
├── scripts/
│   ├── main.js                 # Theme toggle, mobile nav
│   ├── particles.js            # Hero particle animation
│   └── scroll-reveal.js        # Intersection observer animations
│
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.jpg
│   │   ├── papers/
│   │   │   └── paper-placeholder.png
│   │   └── projects/
│   │       └── project-placeholder.png
│   ├── icons/
│   │   ├── sun.svg
│   │   ├── moon.svg
│   │   ├── github.svg
│   │   ├── scholar.svg
│   │   ├── linkedin.svg
│   │   ├── email.svg
│   │   ├── external-link.svg
│   │   ├── menu.svg
│   │   └── close.svg
│   └── files/
│       └── cv-placeholder.pdf
│
├── content/                    # Source content (not deployed, or can be)
│   ├── papers/
│   │   ├── paper-1.md
│   │   ├── paper-2.md
│   │   └── ...
│   └── projects/
│       ├── project-1.md
│       ├── project-2.md
│       └── ...
│
├── templates/                  # HTML templates for build.py
│   ├── papers-page.html        # Full page template
│   ├── projects-page.html
│   ├── paper-card.html         # Single card template
│   └── project-card.html
│
├── build.py                    # Static site generator script
├── README.md
└── .gitignore
```

---

## Python Build System

### Dependencies

```
PyYAML (for frontmatter parsing)
markdown (optional, for rendering markdown content)
```

Or zero dependencies: parse YAML manually (simple frontmatter).

### Content File Format

**Paper (content/papers/paper-slug.md):**
```yaml
---
slug: "attention-rl-2024"
title: "Attention Mechanisms in Deep Reinforcement Learning"
authors:
  - "Achraf Hsain"
  - "Jane Collaborator"
  - "John Advisor"
venue: "NeurIPS"
year: 2024
date: "2024-12-01"
image: "images/papers/attention-rl.png"
arxiv: "https://arxiv.org/abs/2024.xxxxx"
pdf: ""
code: "https://github.com/achrafhsain/attention-rl"
website: ""
bibtex: |
  @inproceedings{hsain2024attention,
    title={Attention Mechanisms...},
    author={Hsain, Achraf and ...},
    booktitle={NeurIPS},
    year={2024}
  }
tags:
  - "reinforcement-learning"
  - "attention"
  - "deep-learning"
featured: true
---
Abstract text goes here. This is a brief description of the paper
that will be shown on the card. Keep it to 2-3 sentences.
```

**Project (content/projects/project-slug.md):**
```yaml
---
slug: "project-name"
title: "Cool Project Name"
description: "One-liner description"
image: "images/projects/project-name.png"
demo: "https://demo-link.com"
github: "https://github.com/achrafhsain/project"
tags:
  - "python"
  - "machine-learning"
  - "web"
featured: false
order: 1
---
Longer description of the project. What it does, why it's interesting,
what technologies were used. 2-3 sentences.
```

### Build Script Functionality

```python
# build.py

# 1. Read all markdown files from content/papers/
# 2. Parse YAML frontmatter and body
# 3. Sort papers by date (newest first)
# 4. Load paper-card.html template
# 5. For each paper, fill template with data
# 6. Load papers-page.html template
# 7. Inject all cards into page
# 8. Write to papers.html

# Same process for projects

# Optional: Generate featured items for index.html
```

### Usage

```bash
python build.py                 # Build all
python build.py --papers        # Build only papers page
python build.py --projects      # Build only projects page
python build.py --watch         # Watch for changes (optional feature)
```

---

## Placeholder Data

### Papers (5 total, 2 featured)

1. **Featured:** "Attention Mechanisms in Deep Reinforcement Learning" - NeurIPS 2024
2. **Featured:** "Efficient Policy Gradient Methods for Robotics" - ICRA 2024
3. "Multi-Agent Coordination Under Uncertainty" - AAMAS 2023
4. "Reward Shaping for Sample-Efficient Learning" - AAAI 2023
5. "A Survey of Sim-to-Real Transfer Techniques" - Preprint 2023

### Projects (6 total, 2 featured)

1. **Featured:** "RL-Gym-Toolkit" - Custom environments for RL research
2. **Featured:** "Attention-Viz" - Visualization tool for attention maps
3. "Paper-Notes" - Personal research paper summaries
4. "Dotfiles" - Development environment configuration
5. "ML-Experiments" - Collection of ML experiments
6. "Portfolio-Site" - This website

### Profile

- Name: Achraf Hsain
- Title: PhD Student
- Affiliation: [University Name] (placeholder)
- Lab: [Lab Name] (placeholder)
- Research focus: Reinforcement Learning, Robotics, Machine Learning

---

## Accessibility Requirements

1. **Color contrast:** Minimum 4.5:1 for body text, 3:1 for large text
2. **Focus states:** Visible focus rings on all interactive elements
3. **Keyboard navigation:** Full site navigable via keyboard
4. **Semantic HTML:** Proper heading hierarchy, landmarks, labels
5. **Alt text:** All images have descriptive alt text
6. **Reduced motion:** Respect `prefers-reduced-motion`
7. **Screen reader:** Test with screen reader for logical flow

---

## Performance Requirements

1. **No frameworks:** Pure HTML/CSS/JS only
2. **Minimal dependencies:** Only Google Fonts externally loaded
3. **Optimized images:** Use WebP where possible, appropriate sizes
4. **Lazy loading:** Images below fold use `loading="lazy"`
5. **Minification:** Optional, not required for this scale
6. **Target:** < 500KB total page weight, < 2s load time

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari & Chrome

No IE11 support required.

---

## SEO Basics

1. Proper `<title>` tags per page
2. Meta descriptions
3. Open Graph tags for social sharing
4. Semantic HTML structure
5. sitemap.xml (already exists, update)
6. robots.txt (already exists)

---

## Summary Checklist for Implementation

- [ ] Set up file structure
- [ ] Create CSS variables system (variables.css)
- [ ] Implement CSS reset and base styles
- [ ] Build navigation component (responsive)
- [ ] Implement theme toggle (with localStorage)
- [ ] Create hero section with particle animation
- [ ] Build card components (paper + project)
- [ ] Implement scroll reveal animations
- [ ] Create all page layouts
- [ ] Build Python content system
- [ ] Add placeholder content and images
- [ ] Test responsive breakpoints
- [ ] Test dark/light mode
- [ ] Verify accessibility
- [ ] Update sitemap.xml
- [ ] Final review and polish

---

## Notes for Builder

1. **Start with variables.css** - Get the design tokens right first
2. **Mobile-first CSS** - Write base styles for mobile, add complexity in media queries
3. **Test theme toggle early** - Make sure color system works before building components
4. **Particles can be added last** - Get core content working first
5. **Keep JavaScript minimal** - Only what's necessary
6. **Comment the code** - Future maintainability is key
7. **Use placeholder images** - Gray boxes with dimensions noted, or use placeholder services

---

*End of Specification*
