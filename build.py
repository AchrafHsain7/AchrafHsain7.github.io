#!/usr/bin/env python3
"""
Static Site Generator for Achraf Hsain's Academic Portfolio

Generates papers.html and projects.html from Markdown content files.
Usage:
    python build.py              # Build all
    python build.py --papers     # Build only papers page
    python build.py --projects   # Build only projects page
"""

import os
import re
import argparse
from datetime import datetime
from pathlib import Path

# Configuration
CONTENT_DIR = Path("content")
TEMPLATES_DIR = Path("templates")
OUTPUT_DIR = Path(".")

# =============================================================================
# YAML Frontmatter Parser (no dependencies)
# =============================================================================

def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}, content
    
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    
    frontmatter_str = parts[1].strip()
    body = parts[2].strip()
    
    # Simple YAML parser for our use case
    data = {}
    current_key = None
    current_list = None
    multiline_key = None
    multiline_value = []
    
    for line in frontmatter_str.split("\n"):
        # Handle multiline values (like bibtex)
        if multiline_key:
            if line and not line[0].isspace() and ":" in line:
                data[multiline_key] = "\n".join(multiline_value)
                multiline_key = None
                multiline_value = []
            else:
                multiline_value.append(line)
                continue
        
        # Skip empty lines
        if not line.strip():
            continue
        
        # Check for list item
        if line.startswith("  - "):
            if current_list is not None:
                current_list.append(line[4:].strip().strip('"').strip("'"))
            continue
        
        # Check for key-value pair
        if ":" in line and not line.startswith(" "):
            key, _, value = line.partition(":")
            key = key.strip()
            value = value.strip()
            
            # Handle multiline indicator
            if value == "|":
                multiline_key = key
                multiline_value = []
                continue
            
            # Handle empty value (likely a list follows)
            if not value:
                data[key] = []
                current_list = data[key]
                current_key = key
                continue
            
            # Handle quoted strings
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            
            # Handle booleans
            if value.lower() == "true":
                value = True
            elif value.lower() == "false":
                value = False
            
            # Handle numbers
            try:
                if "." in str(value):
                    value = float(value)
                else:
                    value = int(value)
            except (ValueError, TypeError):
                pass
            
            data[key] = value
            current_list = None
            current_key = key
    
    # Handle any remaining multiline value
    if multiline_key:
        data[multiline_key] = "\n".join(multiline_value)
    
    return data, body


# =============================================================================
# Content Loading
# =============================================================================

def load_content_files(content_type):
    """Load all markdown files from a content directory."""
    content_path = CONTENT_DIR / content_type
    if not content_path.exists():
        print(f"Warning: {content_path} does not exist")
        return []
    
    items = []
    for file_path in content_path.glob("*.md"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        data, body = parse_frontmatter(content)
        data["_body"] = body
        data["_filename"] = file_path.stem
        items.append(data)
    
    return items


def sort_papers(papers):
    """Sort papers by date (newest first)."""
    def get_date(paper):
        if "date" in paper:
            try:
                return datetime.strptime(paper["date"], "%Y-%m-%d")
            except:
                pass
        if "year" in paper:
            return datetime(paper["year"], 1, 1)
        return datetime(1900, 1, 1)
    
    return sorted(papers, key=get_date, reverse=True)


def sort_projects(projects):
    """Sort projects by order field, then by title."""
    def get_order(project):
        return (project.get("order", 999), project.get("title", ""))
    
    return sorted(projects, key=get_order)


# =============================================================================
# HTML Generation
# =============================================================================

def escape_html(text):
    """Escape HTML special characters."""
    if not isinstance(text, str):
        return str(text)
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
            .replace("'", "&#39;"))


def generate_paper_card(paper):
    """Generate HTML for a single paper card."""
    title = escape_html(paper.get("title", "Untitled"))
    authors = paper.get("authors", [])
    if isinstance(authors, list):
        authors_str = escape_html(", ".join(authors))
    else:
        authors_str = escape_html(str(authors))
    
    venue = escape_html(paper.get("venue", ""))
    year = paper.get("year", "")
    abstract = escape_html(paper.get("_body", ""))[:300]
    if len(paper.get("_body", "")) > 300:
        abstract += "..."
    
    image = paper.get("image", "assets/images/papers/paper-placeholder.png")
    arxiv = paper.get("arxiv", "")
    pdf = paper.get("pdf", "")
    code = paper.get("code", "")
    bibtex = paper.get("bibtex", "")
    tags = paper.get("tags", [])
    featured = paper.get("featured", False)
    
    # Build tags HTML
    tags_html = ""
    if tags:
        tags_html = '<div class="paper-card__tags tags">'
        for tag in tags:
            tags_html += f'<span class="tag">{escape_html(tag)}</span>'
        tags_html += '</div>'
    
    # Build actions HTML
    actions = []
    if arxiv:
        actions.append(f'<a href="{escape_html(arxiv)}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">Link</a>')
    if pdf:
        actions.append(f'<a href="{escape_html(pdf)}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">PDF</a>')
    if code:
        actions.append(f'<a href="{escape_html(code)}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">Code</a>')
    if bibtex:
        bibtex_escaped = escape_html(bibtex).replace("\n", "&#10;")
        actions.append(f'<button class="btn btn--ghost btn--sm bibtex-btn" data-bibtex="{bibtex_escaped}">BibTeX</button>')
    
    actions_html = ""
    if actions:
        actions_html = '<div class="paper-card__actions">' + "".join(actions) + '</div>'
    
    featured_badge = '<div class="paper-card__badge">Featured</div>' if featured else ''
    
    return f'''
            <article class="card paper-card reveal">
              {featured_badge}
              <img src="{escape_html(image)}" alt="{title} figure" class="paper-card__image" loading="lazy">
              <div class="paper-card__content">
                <h3 class="paper-card__title">{title}</h3>
                <p class="paper-card__authors">{authors_str}</p>
                <p class="paper-card__venue">{venue} {year}</p>
                <p class="paper-card__abstract">{abstract}</p>
                {tags_html}
                {actions_html}
              </div>
            </article>'''


def generate_project_card(project):
    """Generate HTML for a single project card."""
    title = escape_html(project.get("title", "Untitled"))
    description = escape_html(project.get("_body", project.get("description", "")))
    image = project.get("image", "assets/images/projects/project-placeholder.png")
    demo = project.get("demo", "")
    github = project.get("github", "")
    tags = project.get("tags", [])
    featured = project.get("featured", False)
    
    # Build tags HTML
    tags_html = ""
    if tags:
        tags_html = '<div class="project-card__tags tags">'
        for tag in tags:
            tags_html += f'<span class="tag">{escape_html(tag)}</span>'
        tags_html += '</div>'
    
    # Build actions HTML
    actions = []
    if demo:
        actions.append(f'<a href="{escape_html(demo)}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">Demo</a>')
    if github:
        actions.append(f'<a href="{escape_html(github)}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">GitHub</a>')
    
    actions_html = ""
    if actions:
        actions_html = '<div class="project-card__actions">' + "".join(actions) + '</div>'
    
    featured_badge = '<div class="project-card__badge">Featured</div>' if featured else ''
    
    return f'''
            <article class="card project-card reveal">
              {featured_badge}
              <img src="{escape_html(image)}" alt="{title} screenshot" class="project-card__image" loading="lazy">
              <h3 class="project-card__title">{title}</h3>
              <p class="project-card__description">{description}</p>
              {tags_html}
              {actions_html}
            </article>'''


# =============================================================================
# Page Templates
# =============================================================================

def get_page_header():
    """Return the common page header HTML."""
    return '''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Achraf Hsain">
  
  <!-- Favicon -->
  <link rel="icon" href="assets/images/favicon.png" type="image/png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="styles/variables.css">
  <link rel="stylesheet" href="styles/reset.css">
  <link rel="stylesheet" href="styles/base.css">
  <link rel="stylesheet" href="styles/layout.css">
  <link rel="stylesheet" href="styles/components.css">
  <link rel="stylesheet" href="styles/utilities.css">
  <link rel="stylesheet" href="styles/animations.css">
  
  <!-- Scripts -->
  <script src="scripts/main.js" defer></script>
  <script src="scripts/scroll-reveal.js" defer></script>
</head>
<body>
  <div class="site-wrapper">
    <!-- Navigation -->
    <nav class="nav">
      <div class="nav__container">
        <a href="index.html" class="nav__logo">
          <span class="nav__logo-icon">A</span>
          Achraf Hsain
        </a>
        
        <div class="nav__links">
          <a href="about.html" class="nav__link">About</a>
          <a href="papers.html" class="nav__link">Papers</a>
          <a href="projects.html" class="nav__link">Projects</a>
          <a href="cv.html" class="nav__link">CV</a>
        </div>
        
        <div class="nav__actions">
          <button class="theme-toggle" aria-label="Toggle theme">
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          
          <button class="nav__menu-btn" aria-label="Open menu" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Mobile Navigation Drawer -->
    <div class="nav__mobile">
      <div class="nav__mobile-content">
        <div class="nav__mobile-header">
          <button class="nav__mobile-close" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="nav__mobile-links">
          <a href="index.html" class="nav__mobile-link">Home</a>
          <a href="about.html" class="nav__mobile-link">About</a>
          <a href="papers.html" class="nav__mobile-link">Papers</a>
          <a href="projects.html" class="nav__mobile-link">Projects</a>
          <a href="cv.html" class="nav__mobile-link">CV</a>
        </div>
      </div>
    </div>
    <div class="nav__mobile-backdrop"></div>
    
    <main>'''


def get_page_footer():
    """Return the common page footer HTML."""
    return '''
    </main>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <p class="footer__copyright">© 2025 Achraf Hsain</p>
          <div class="footer__links">
            <a href="https://github.com/AchrafHsain7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:achraf@example.com" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>'''


# =============================================================================
# Build Functions
# =============================================================================

def build_papers_page():
    """Build the papers.html page from content files."""
    print("Building papers.html...")
    
    papers = load_content_files("papers")
    if not papers:
        print("  No paper content files found in content/papers/")
        print("  Using placeholder message.")
        cards_html = '<p class="text-secondary">No publications yet. Check back soon!</p>'
    else:
        papers = sort_papers(papers)
        cards_html = "\n".join(generate_paper_card(p) for p in papers)
        print(f"  Found {len(papers)} papers")
    
    page_content = f'''
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title reveal">Publications</h1>
          <p class="text-secondary reveal">Research papers and preprints</p>
        </div>
      </section>

      <!-- Papers List -->
      <section class="section">
        <div class="container">
          <div class="papers-list">
            {cards_html}
          </div>
        </div>
      </section>'''
    
    html = get_page_header()
    html = html.replace(
        '<meta name="author" content="Achraf Hsain">',
        '<meta name="description" content="Publications by Achraf Hsain - Research papers in machine learning, reinforcement learning, and robotics.">\n  <meta name="author" content="Achraf Hsain">'
    )
    html = html.replace('<title>', '<title>Publications - Achraf Hsain</title>\n  <!-- <title>')
    html = html.replace('</head>', '-->\n</head>')
    html += page_content
    html += get_page_footer()
    
    # Fix the title hack
    html = html.replace('<title>Publications - Achraf Hsain</title>\n  <!-- <title>', '<title>Publications - Achraf Hsain</title>')
    html = html.replace('-->\n</head>', '</head>')
    
    output_path = OUTPUT_DIR / "papers.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    print(f"  Written to {output_path}")


def build_projects_page():
    """Build the projects.html page from content files."""
    print("Building projects.html...")
    
    projects = load_content_files("projects")
    if not projects:
        print("  No project content files found in content/projects/")
        print("  Using placeholder message.")
        cards_html = '<p class="text-secondary">No projects yet. Check back soon!</p>'
    else:
        projects = sort_projects(projects)
        cards_html = "\n".join(generate_project_card(p) for p in projects)
        print(f"  Found {len(projects)} projects")
    
    page_content = f'''
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title reveal">Projects</h1>
          <p class="text-secondary reveal">Open source tools, research implementations, and side projects</p>
        </div>
      </section>

      <!-- Projects Grid -->
      <section class="section">
        <div class="container">
          <div class="projects-grid">
            {cards_html}
          </div>
        </div>
      </section>'''
    
    html = get_page_header()
    html = html.replace(
        '<meta name="author" content="Achraf Hsain">',
        '<meta name="description" content="Projects by Achraf Hsain - Open source tools, research implementations, and side projects.">\n  <meta name="author" content="Achraf Hsain">'
    )
    html = html.replace('<title>', '<title>Projects - Achraf Hsain</title>\n  <!-- <title>')
    html = html.replace('</head>', '-->\n</head>')
    html += page_content
    html += get_page_footer()
    
    # Fix the title hack
    html = html.replace('<title>Projects - Achraf Hsain</title>\n  <!-- <title>', '<title>Projects - Achraf Hsain</title>')
    html = html.replace('-->\n</head>', '</head>')
    
    output_path = OUTPUT_DIR / "projects.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    print(f"  Written to {output_path}")


def create_sample_content():
    """Create sample content files for testing."""
    print("Creating sample content files...")
    
    # Create directories
    (CONTENT_DIR / "papers").mkdir(parents=True, exist_ok=True)
    (CONTENT_DIR / "projects").mkdir(parents=True, exist_ok=True)
    
    # Sample paper
    sample_paper = '''---
slug: "attention-rl-2024"
title: "Attention Mechanisms in Deep Reinforcement Learning"
authors:
  - "Achraf Hsain"
  - "Jane Collaborator"
  - "John Advisor"
venue: "NeurIPS"
year: 2024
date: "2024-12-01"
image: "assets/images/papers/paper-placeholder.png"
arxiv: "https://arxiv.org/abs/2024.xxxxx"
code: "https://github.com/achrafhsain/attention-rl"
tags:
  - "reinforcement-learning"
  - "attention"
  - "deep-learning"
featured: true
bibtex: |
  @inproceedings{hsain2024attention,
    title={Attention Mechanisms in Deep Reinforcement Learning},
    author={Hsain, Achraf and Collaborator, Jane and Advisor, John},
    booktitle={NeurIPS},
    year={2024}
  }
---
This paper introduces novel attention mechanisms for deep reinforcement learning agents, enabling more efficient exploration and better generalization across tasks. We demonstrate significant improvements on standard benchmarks.
'''
    
    with open(CONTENT_DIR / "papers" / "attention-rl-2024.md", "w") as f:
        f.write(sample_paper)
    
    # Sample project
    sample_project = '''---
slug: "rl-gym-toolkit"
title: "RL-Gym-Toolkit"
description: "Custom OpenAI Gym environments for RL research"
image: "assets/images/projects/project-placeholder.png"
demo: "https://demo.example.com"
github: "https://github.com/achrafhsain/rl-gym-toolkit"
tags:
  - "python"
  - "reinforcement-learning"
  - "gym"
featured: true
order: 1
---
A comprehensive collection of custom OpenAI Gym environments designed for reinforcement learning research. Includes challenging navigation, manipulation, and multi-agent scenarios with configurable difficulty levels.
'''
    
    with open(CONTENT_DIR / "projects" / "rl-gym-toolkit.md", "w") as f:
        f.write(sample_project)
    
    print("  Created sample content files in content/papers/ and content/projects/")


# =============================================================================
# Main
# =============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Build static pages from markdown content"
    )
    parser.add_argument("--papers", action="store_true", help="Build only papers page")
    parser.add_argument("--projects", action="store_true", help="Build only projects page")
    parser.add_argument("--init", action="store_true", help="Create sample content files")
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("Academic Portfolio Static Site Generator")
    print("=" * 60)
    
    if args.init:
        create_sample_content()
        return
    
    # Build specific or all pages
    if args.papers:
        build_papers_page()
    elif args.projects:
        build_projects_page()
    else:
        build_papers_page()
        build_projects_page()
    
    print("=" * 60)
    print("Build complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
