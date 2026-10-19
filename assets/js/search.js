/**
 * Intelligent Live Search with Banglish & Synonym Mapping
 * TechBridge BD
 */

import { DataService } from './dataService.js';
import { formatCurrency } from './config.js';

// Synonym map for common Banglish or tech slang
const SYNONYMS = {
  'erbuds': 'earbuds',
  'earbud': 'earbuds',
  'airpod': 'earbuds',
  'airpods': 'earbuds',
  'tws': 'audio',
  'headphone': 'audio',
  'sound': 'audio',
  'gan': 'power',
  'charger': 'power',
  'smartwatch': 'smart-watch',
  'ghori': 'smart-watch',
  'watch': 'smart-watch',
  'mowse': 'mouse',
  'mice': 'mouse',
  'keybord': 'keyboard',
  'keycap': 'keyboard',
  'cooler': 'pc-parts',
  'cooler': 'pc-parts',
  'cooler fan': 'pc-parts',
  'nvme': 'pc-parts',
  'ssd': 'pc-parts'
};

function getRelativePrefix() {
  return window.location.pathname.includes('/policy/') ? '../' : '';
}

export const SearchService = {
  init() {
    const searchInputs = document.querySelectorAll('.header-search-input');
    const urlParams = new URLSearchParams(window.location.search);
    const existingSearch = urlParams.get('search');

    searchInputs.forEach(input => {
      // Pre-fill if on shop page and query exists in URL
      if (existingSearch && (window.location.pathname.includes('shop.html') || window.location.pathname.endsWith('/shop'))) {
        input.value = existingSearch;
      }
      this.bindInput(input);
    });
  },

  executeSearch(query) {
    const trimmed = query.trim();
    const prefix = getRelativePrefix();
    const isShopPage = window.location.pathname.includes('shop.html');

    if (isShopPage) {
      // Dispatch custom event for instant in-page filtering without reloading
      window.dispatchEvent(new CustomEvent('techbridge:shop-search', { detail: { query: trimmed } }));
      
      const newUrl = trimmed 
        ? `${window.location.pathname}?search=${encodeURIComponent(trimmed)}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } else {
      if (trimmed) {
        window.location.href = `${prefix}shop.html?search=${encodeURIComponent(trimmed)}`;
      } else {
        window.location.href = `${prefix}shop.html`;
      }
    }
  },

  bindInput(input) {
    const parent = input.closest('.header-search-container');
    if (!parent) return;

    let dropdown = parent.querySelector('.live-search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'live-search-dropdown';
      parent.appendChild(dropdown);
    }

    const searchBtn = parent.querySelector('.header-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.style.display = 'none';
        this.executeSearch(input.value);
      });
    }

    let debounceTimer;

    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();

      if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      debounceTimer = setTimeout(async () => {
        let normalizedQuery = query.toLowerCase();
        // check synonym replacement
        for (const [misspelled, correct] of Object.entries(SYNONYMS)) {
          if (normalizedQuery.includes(misspelled)) {
            normalizedQuery = normalizedQuery.replace(misspelled, correct);
          }
        }

        const results = await DataService.searchProducts(normalizedQuery);
        this.renderDropdown(dropdown, results, query);
      }, 180);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!parent.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    // Keyboard handlers: Enter executes search, Escape closes dropdown
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        dropdown.style.display = 'none';
        this.executeSearch(input.value);
      } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });
  },

  renderDropdown(dropdown, results, query) {
    const prefix = getRelativePrefix();

    if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div class="p-3 text-center text-muted small">
          <i class="bi bi-search me-1"></i> No matching tech items found for "<strong>${escapeHtml(query)}</strong>"
          <div class="mt-2">
            <a href="${prefix}request.html" class="text-accent fw-bold">Can't find it? Request custom import →</a>
          </div>
        </div>
      `;
      dropdown.style.display = 'block';
      return;
    }

    const itemsHTML = results.slice(0, 5).map(item => {
      const img = item.image || (item.images && item.images[0]) || `${prefix}assets/img/ui/placeholder.svg`;
      const imgPath = img.startsWith('http') || img.startsWith('../') ? img : `${prefix}${img}`;
      return `
        <a href="${prefix}product.html?id=${item.slug || item.id}" class="live-search-item">
          <img src="${imgPath}" alt="${escapeHtml(item.name)}" class="live-search-thumb" loading="lazy">
          <div class="live-search-info">
            <div class="live-search-title">${escapeHtml(item.name)}</div>
            <div class="live-search-meta">${formatCurrency(item.price.final)} <span class="badge-custom badge-preorder ms-1">Air Cargo</span></div>
          </div>
        </a>
      `;
    }).join('');

    dropdown.innerHTML = `
      ${itemsHTML}
      <div class="p-2 bg-light text-center border-top">
        <a href="${prefix}shop.html?search=${encodeURIComponent(query)}" class="small text-primary fw-bold">
          View all results for "${escapeHtml(query)}" →
        </a>
      </div>
    `;
    dropdown.style.display = 'block';
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}
