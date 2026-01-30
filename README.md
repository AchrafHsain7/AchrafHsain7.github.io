# Achraf Hsain - Academic Portfolio

A modern, sleek academic portfolio website built with pure HTML, CSS, and JavaScript.

## Features

- 🌓 Dark/light theme toggle (persists to localStorage)
- 📱 Fully responsive with mobile navigation drawer
- ✨ Particle canvas animation on hero section
- 🎭 Scroll reveal animations
- 📋 BibTeX copy-to-clipboard
- ♿ Accessible (ARIA labels, keyboard navigation, reduced motion support)
- 🐍 Python-based static site generator for papers and projects

## Structure

```
website/
├── index.html          # Home page
├── about.html          # About page
├── papers.html         # Publications (can be generated)
├── projects.html       # Projects (can be generated)
├── cv.html             # CV with PDF embed
├── 404.html            # Error page
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── build.py            # Static site generator
│
├── styles/
│   ├── variables.css   # Design tokens
│   ├── reset.css       # CSS reset
│   ├── base.css        # Base styles
│   ├── layout.css      # Layout utilities
│   ├── components.css  # UI components
│   ├── utilities.css   # Helper classes
│   └── animations.css  # Animations
│
├── scripts/
│   ├── main.js         # Theme toggle, mobile nav
│   ├── particles.js    # Hero particle animation
│   └── scroll-reveal.js # Scroll animations
│
├── assets/
│   ├── icons/          # SVG icons
│   ├── images/         # Images and placeholders
│   └── files/          # CV PDF
│
└── content/            # Markdown source files
    ├── papers/         # Paper .md files
    └── projects/       # Project .md files
```

## Usage

### Static Pages

The HTML pages can be edited directly. Open `index.html` in a browser to preview.

### Using the Build Script

The build script generates `papers.html` and `projects.html` from Markdown files:

```bash
# Create sample content files
python build.py --init

# Build all pages
python build.py

# Build only papers
python build.py --papers

# Build only projects
python build.py --projects
```

### Content Format

**Paper (content/papers/my-paper.md):**

```yaml
---
slug: "my-paper-2024"
title: "My Paper Title"
authors:
  - "Achraf Hsain"
  - "Co-Author Name"
venue: "NeurIPS"
year: 2024
date: "2024-12-01"
image: "assets/images/papers/my-paper.png"
arxiv: "https://arxiv.org/abs/xxxx.xxxxx"
pdf: "https://example.com/paper.pdf"
code: "https://github.com/username/repo"
tags:
  - "machine-learning"
  - "reinforcement-learning"
featured: true
bibtex: |
  @inproceedings{hsain2024mypaper,
    title={My Paper Title},
    author={Hsain, Achraf},
    booktitle={NeurIPS},
    year={2024}
  }
---
Abstract text goes here. This will be shown on the paper card.
```

**Project (content/projects/my-project.md):**

```yaml
---
slug: "my-project"
title: "My Project"
description: "Short one-liner"
image: "assets/images/projects/my-project.png"
demo: "https://demo.example.com"
github: "https://github.com/username/repo"
tags:
  - "python"
  - "machine-learning"
featured: true
order: 1
---
Longer description of the project.
```

## Deployment

### GitHub Pages

1. Push the contents to your `username.github.io` repository
2. Enable GitHub Pages in repository settings
3. Site will be live at `https://username.github.io`

### Customization

1. Update personal info in HTML files
2. Replace placeholder images in `assets/images/`
3. Update social links in footer sections
4. Replace `assets/files/cv-placeholder.pdf` with your actual CV
5. Add your papers and projects to `content/` and run `python build.py`

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT
