/**
 * Main Application Orchestrator
 * TechBridge BD
 */

import { CartService } from './cart.js';
import { WishlistService } from './wishlist.js';
import { DataService } from './dataService.js';
import { WhatsAppService } from './whatsapp.js';
import { SearchService } from './search.js';
import { RenderService } from './render.js';
import { ThemeService } from './theme.js';
import { I18nService } from './i18n.js';
import { PaymentGateway } from './paymentGateway.js';
import { ComponentLoader } from './components.js';
import { APP_CONFIG } from './config.js';

// Expose services globally for direct page interactions
window.PaymentGateway = PaymentGateway;
window.ThemeService = ThemeService;
window.I18nService = I18nService;
window.CartService = CartService;
window.WhatsAppService = WhatsAppService;
window.ComponentLoader = ComponentLoader;

// Initialize theme and language as early as possible
ThemeService.init();
I18nService.init();

document.addEventListener('DOMContentLoaded', async () => {
  await ComponentLoader.init();
  initGlobalState();
  initEventDelegation();
  SearchService.init();
  highlightActiveNavigation();
  initAnnouncementBar();
});

function initGlobalState() {
  CartService.syncBadges();
  WishlistService.syncBadges();
}

function initEventDelegation() {
  document.body.addEventListener('click', async (e) => {
    // 1. Quick WhatsApp Order button on card
    const waBtn = e.target.closest('.js-quick-whatsapp');
    if (waBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = waBtn.dataset.productId;
      const product = await DataService.getProductById(productId);
      if (product) {
        WhatsAppService.orderProduct({
          product,
          variant: "Standard",
          quantity: 1,
          currentUrl: `${window.location.origin}/product.html?id=${product.slug || product.id}`
        });
      }
      return;
    }

    // 2. Quick Add to Cart button on card
    const cartBtn = e.target.closest('.js-quick-cart');
    if (cartBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = cartBtn.dataset.productId;
      const product = await DataService.getProductById(productId);
      if (product) {
        CartService.addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price.final,
          image: product.image || (product.images && product.images[0]),
          variant: "Standard",
          quantity: 1,
          etaDays: product.preorder?.etaDays || [12, 18]
        });
        RenderService.showToast(`Added to Order List: ${product.name}`, 'bi-bag-check-fill');
      }
      return;
    }

    // 3. Wishlist toggle on card
    const wishBtn = e.target.closest('.product-card-wishlist-btn');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = wishBtn.dataset.wishlistId;
      const product = await DataService.getProductById(productId);
      if (product) {
        const added = WishlistService.toggleItem(product);
        const icon = wishBtn.querySelector('i');
        if (added) {
          wishBtn.classList.add('active');
          if (icon) {
            icon.className = 'bi bi-heart-fill';
          }
          RenderService.showToast(`Saved to Wishlist: ${product.name}`, 'bi-heart-fill');
        } else {
          wishBtn.classList.remove('active');
          if (icon) {
            icon.className = 'bi bi-heart';
          }
          RenderService.showToast(`Removed from Wishlist`, 'bi-heart');
        }
      }
      return;
    }
  });
}

function initAnnouncementBar() {
  const popup = document.getElementById('announcementPopup') || document.querySelector('.announcement-popup') || document.querySelector('.announcement-bar');
  const closeBtn = document.getElementById('announcementCloseBtn') || document.querySelector('.announcement-popup-close') || document.querySelector('.announcement-close');
  
  if (!popup) return;

  const storageKey = APP_CONFIG?.storageKeys?.announcementDismissed || 'techbridge_announcement_dismissed';
  const isDismissed = localStorage.getItem(storageKey) === 'true' || sessionStorage.getItem(storageKey) === 'true';

  if (isDismissed) {
    popup.classList.add('dismissed');
    popup.style.display = 'none';
    return;
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.add('dismissed');
      localStorage.setItem(storageKey, 'true');
      sessionStorage.setItem(storageKey, 'true');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 260);
    });
  }
}

function highlightActiveNavigation() {
  const path = window.location.pathname;
  document.querySelectorAll('.mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))))) {
      link.classList.add('active');
    }
  });
}
