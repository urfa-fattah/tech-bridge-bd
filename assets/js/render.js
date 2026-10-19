/**
 * UI Component Renderers
 * TechBridge BD
 */

import { formatCurrency, APP_CONFIG } from './config.js';
import { WishlistService } from './wishlist.js';

export const RenderService = {
  /**
   * Render single product card matching wireframe 6.4 with clean unobstructed photo
   */
  renderProductCard(product) {
    const isWishlisted = WishlistService.hasItem(product.id);
    const finalPrice = product.price.final;
    const marketPrice = product.price.market;
    const discountPercent = marketPrice > finalPrice 
      ? Math.round(((marketPrice - finalPrice) / marketPrice) * 100)
      : 0;

    const advanceAmount = Math.round(finalPrice * (APP_CONFIG.advancePercent / 100));
    const etaText = product.preorder?.etaDays 
      ? `${product.preorder.etaDays[0]}–${product.preorder.etaDays[1]}d` 
      : "12–16d";

    const lang = (window.I18nService && typeof window.I18nService.getLanguage === 'function') 
      ? window.I18nService.getLanguage() 
      : (localStorage.getItem('techbridge_lang_v1') || 'bn');
    const title = (lang === 'bn' && product.nameBn) ? product.nameBn : product.name;
    const orderBtnText = lang === 'bn' ? 'অর্ডার' : 'Order';
    const advLabel = lang === 'bn' ? 'অগ্রিম' : 'Adv';

    const imgUrl = product.image || (product.images && product.images[0]) || 'assets/img/ui/placeholder.svg';

    return `
      <div class="col">
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-card-thumb-wrap">
            ${discountPercent > 0 ? `
              <div class="product-card-badges">
                <span class="discount-pill">-${discountPercent}%</span>
              </div>
            ` : ''}
            <button type="button" class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${product.id}" aria-label="Add to wishlist" title="Add to Wishlist">
              <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            <a href="product.html?id=${product.slug || product.id}">
              <img src="${imgUrl}" alt="${escapeHtml(title)}" class="product-card-img" loading="lazy" decoding="async">
            </a>
          </div>

          <div class="product-card-body">
            <span class="product-card-brand">${product.brand || 'Original Brand'}</span>
            <h3 class="product-card-title">
              <a href="product.html?id=${product.slug || product.id}">${escapeHtml(title)}</a>
            </h3>

            <div class="product-card-rating">
              <i class="bi bi-star-fill"></i>
              <span class="fw-bold text-dark">${product.rating || '4.8'}</span>
              <span class="count">(${product.reviewCount || '25'})</span>
            </div>

            <div class="product-card-price-row">
              <span class="product-card-price-final">${formatCurrency(finalPrice)}</span>
              ${marketPrice > finalPrice ? `<span class="product-card-price-market">${formatCurrency(marketPrice)}</span>` : ''}
              ${discountPercent > 0 ? `<span class="product-card-save-tag">-${discountPercent}%</span>` : ''}
            </div>

            <div class="product-card-meta">
              <span class="product-card-eta">
                <i class="bi bi-airplane-engines"></i> ETA: ${etaText}
              </span>
              <span class="product-card-advance">
                ${advLabel}: ${formatCurrency(advanceAmount)}
              </span>
            </div>

            <div class="product-card-actions">
              <button type="button" class="btn-card-whatsapp js-quick-whatsapp" data-product-id="${product.id}">
                <i class="bi bi-whatsapp"></i> ${orderBtnText}
              </button>
              <button type="button" class="btn-card-cart js-quick-cart" data-product-id="${product.id}" title="Add to Order List">
                <i class="bi bi-bag-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render category grid item
   */
  renderCategoryItem(cat) {
    return `
      <a href="shop.html?category=${cat.slug}" class="category-card-item">
        <div class="category-icon-box">
          <i class="bi ${cat.icon || 'bi-cpu'}"></i>
        </div>
        <span class="category-name">${cat.nameBn || cat.name}</span>
      </a>
    `;
  },

  /**
   * Render customer review card
   */
  renderReviewCard(review) {
    const stars = Array(review.rating || 5).fill('<i class="bi bi-star-fill text-warning"></i>').join('');
    return `
      <div class="card-custom p-4 h-100 d-flex flex-column">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-circle bg-primary-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px;">
              ${review.name.charAt(0)}
            </div>
            <div>
              <h6 class="mb-0 fw-bold">${review.name}</h6>
              <small class="text-muted"><i class="bi bi-geo-alt"></i> ${review.location}</small>
            </div>
          </div>
          <span class="badge-custom badge-success-soft">
            <i class="bi bi-patch-check-fill"></i> Verified Pre-Order
          </span>
        </div>

        <div class="mb-2">${stars}</div>
        <p class="text-secondary small mb-3 flex-grow-1 font-italic">"${review.comment}"</p>

        <div class="pt-2 border-top border-light d-flex justify-content-between align-items-center">
          <small class="text-primary fw-semibold">${review.productName}</small>
          <small class="text-muted">${review.date}</small>
        </div>
      </div>
    `;
  },

  /**
   * Toast notification generator
   */
  showToast(message, icon = 'bi-check-circle-fill') {
    let container = document.querySelector('.toast-container-custom');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `<i class="bi ${icon} text-success"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}
