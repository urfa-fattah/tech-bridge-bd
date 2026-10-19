/**
 * Wishlist Manager
 * TechBridge BD
 */

import { APP_CONFIG } from './config.js';

export const WishlistService = {
  getItems() {
    try {
      const stored = localStorage.getItem(APP_CONFIG.storageKeys.wishlist);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(APP_CONFIG.storageKeys.wishlist, JSON.stringify(items));
    this.syncBadges();
    window.dispatchEvent(new CustomEvent('wishlist_updated', { detail: { items } }));
  },

  hasItem(id) {
    const items = this.getItems();
    return items.some(item => item.id === id);
  },

  toggleItem(product) {
    let items = this.getItems();
    const index = items.findIndex(item => item.id === product.id);

    if (index > -1) {
      items.splice(index, 1);
      this.saveItems(items);
      return false; // removed
    } else {
      items.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price.final,
        image: product.image || (product.images && product.images[0]),
        category: product.category
      });
      this.saveItems(items);
      return true; // added
    }
  },

  getTotalCount() {
    return this.getItems().length;
  },

  syncBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll('.wishlist-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};
