/**
 * Theme Manager (Light & Dark Mode)
 * TechBridge BD
 */

const THEME_STORAGE_KEY = 'techbridge_theme_v1';

export class ThemeService {
  /**
   * Get current theme ('light' or 'dark')
   */
  static getTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Apply theme to <html> element and update all theme toggle buttons
   * @param {'light'|'dark'} theme
   */
  static applyTheme(theme) {
    const activeTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);

    // Update toggle buttons in DOM
    const toggleBtns = document.querySelectorAll('.js-theme-toggle');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.js-theme-label');
      
      if (activeTheme === 'dark') {
        if (icon) icon.className = 'bi bi-sun-fill text-warning';
        if (text) text.textContent = 'Light';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        if (icon) icon.className = 'bi bi-moon-stars-fill';
        if (text) text.textContent = 'Dark';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });

    window.dispatchEvent(new CustomEvent('techbridge-theme-changed', { detail: { theme: activeTheme } }));
  }

  /**
   * Toggle between light and dark mode
   */
  static toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    return next;
  }

  /**
   * Initialize theme immediately
   */
  static init() {
    const savedTheme = this.getTheme();
    this.applyTheme(savedTheme);

    // Listen for click on any theme toggle element
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-theme-toggle');
      if (btn) {
        e.preventDefault();
        ThemeService.toggleTheme();
      }
    });

    // Respond dynamically to OS system theme changes if user hasn't explicitly set a preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          ThemeService.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}

