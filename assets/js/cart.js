/**
 * Shopping Cart & Pre-Order List Manager
 * TechBridge BD
 */

import { APP_CONFIG } from './config.js';

export const CartService = {
  getItems() {
    try {
      const stored = localStorage.getItem(APP_CONFIG.storageKeys.cart);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(APP_CONFIG.storageKeys.cart, JSON.stringify(items));
    this.syncBadges();
    window.dispatchEvent(new CustomEvent('cart_updated', { detail: { items } }));
  },

  addItem({ id, name, slug, price, image, variant = "Standard", quantity = 1, etaDays = [12, 18] }) {
    const items = this.getItems();
    const existingIndex = items.findIndex(i => i.id === id && i.variant === variant);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id,
        name,
        slug,
        price,
        image,
        variant,
        quantity,
        etaDays
      });
    }

    this.saveItems(items);
    return items;
  },

  updateQuantity(id, variant, newQty) {
    let items = this.getItems();
    if (newQty <= 0) {
      items = items.filter(i => !(i.id === id && i.variant === variant));
    } else {
      const target = items.find(i => i.id === id && i.variant === variant);
      if (target) target.quantity = newQty;
    }
    this.saveItems(items);
    return items;
  },

  removeItem(id, variant) {
    const items = this.getItems().filter(i => !(i.id === id && i.variant === variant));
    this.saveItems(items);
    return items;
  },

  clearCart() {
    this.saveItems([]);
  },

  getTotalCount() {
    return this.getItems().reduce((acc, item) => acc + item.quantity, 0);
  },

  getSubtotal() {
    return this.getItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },

  getAdvanceAmount() {
    const total = this.getSubtotal();
    return Math.round(total * (APP_CONFIG.advancePercent / 100));
  },

  syncBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};
