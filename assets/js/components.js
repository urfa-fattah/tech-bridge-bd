/**
 * Reusable HTML Component Loader & Link Synchronizer
 * TechBridge BD
 * 
 * Supports both:
 * 1. Dynamic injection via <div data-component="header"> etc.
 * 2. Static pre-rendered hydration with automatic active page highlighting and relative path fixing.
 */

export const ComponentLoader = {
  getPrefix() {
    return window.location.pathname.includes('/policy/') ? '../' : '';
  },

  async loadComponent(name) {
    const prefix = this.getPrefix();
    const url = `${prefix}components/${name}.html`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      let html = await res.text();
      // Adjust relative links if inside a subfolder like policy/
      if (prefix) {
        html = html.replace(/href="(?!http|mailto|#|\.\.\/)([^"]+)"/g, `href="../$1"`);
        html = html.replace(/src="(?!http|data:|\.\.\/)([^"]+)"/g, `src="../$1"`);
      }
      return html;
    } catch (e) {
      console.warn(`ComponentLoader: Failed to fetch ${url}:`, e);
      return null;
    }
  },

  async init() {
    const prefix = this.getPrefix();
    const componentSlots = document.querySelectorAll('[data-component]');
    
    for (const slot of componentSlots) {
      const name = slot.getAttribute('data-component');
      if (name) {
        const html = await this.loadComponent(name);
        if (html) {
          slot.innerHTML = html;
        }
      }
    }

    this.highlightActiveNavigation();
  },

  highlightActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sub-navbar .nav-link, .mobile-bottom-nav .mobile-nav-item, #mobileMenuOffcanvas .nav-link, #mobileMenuOffcanvas .offcanvas-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.split('?')[0].split('#')[0];
      const isHome = (cleanHref === 'index.html' || cleanHref === '../index.html') && 
                     (currentPath.endsWith('/') || currentPath.endsWith('index.html'));
      const isMatch = currentPath.endsWith(cleanHref);

      if (isHome || isMatch) {
        link.classList.add('active');
        if (link.classList.contains('mobile-nav-item')) {
          link.classList.add('active');
        }
      }
    });
  }
};
