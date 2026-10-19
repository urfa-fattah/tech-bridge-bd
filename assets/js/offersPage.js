/**
 * Special Offers Page Controller (Flat 60% Off Mega Clearance)
 * TechBridge BD
 */

import { DataService } from './dataService.js';
import { formatCurrency, APP_CONFIG } from './config.js';
import { WishlistService } from './wishlist.js';
import { I18nService } from './i18n.js';

let allOfferProducts = [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await initOffersPage();
});

async function initOffersPage() {
  const container = document.getElementById('offersProductGrid');
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="text-muted small mt-2" data-i18n="loading_offers">৬০% ডিসকাউন্ট প্রোডাক্ট লোড হচ্ছে...</p>
    </div>
  `;

  // Start real-time countdown timer
  initCountdownTimer();

  // Load all products and filter for 60% offers or isSpecialOffer
  const allProducts = await DataService.getAllProducts();
  allOfferProducts = allProducts.filter(p => {
    return p.isSpecialOffer === true || 
           p.discountPercent >= 50 || 
           (p.tags && p.tags.includes('60-percent-off')) ||
           p.id.startsWith('off-');
  });

  // If none found by filter, fallback to first 6 products with artificial 60% discount for safety
  if (allOfferProducts.length === 0) {
    allOfferProducts = allProducts.slice(0, 6);
  }

  renderOffersGrid();
  initCategoryFilters();

  // Listen for language changes to re-render in chosen language
  window.addEventListener('techbridge-lang-changed', () => {
    renderOffersGrid();
  });
}

function initCountdownTimer() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5); // 5 days from now
  targetDate.setHours(23, 59, 59, 0);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      const timerEl = document.getElementById('offerCountdown');
      if (timerEl) timerEl.innerHTML = '<span class="text-danger fw-bold">CAMPAIGN ENDED</span>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('timerDays');
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMinutes');
    const sEl = document.getElementById('timerSeconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.offer-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'all';
      renderOffersGrid();
    });
  });
}

function renderOffersGrid() {
  const container = document.getElementById('offersProductGrid');
  if (!container) return;

  const currentLang = I18nService.getLanguage();

  const filtered = activeCategory === 'all'
    ? allOfferProducts
    : allOfferProducts.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-tag-fill display-4 text-muted"></i>
        <p class="h6 mt-3 text-muted">এই ক্যাটাগরিতে এই মুহূর্তে কোনো ৬০% অফার স্টক বাকি নেই।</p>
        <button class="btn btn-outline-primary btn-sm mt-2" onclick="document.querySelector('.offer-filter-btn[data-category=\\'all\\']').click()">সকল ৬০% অফার দেখুন</button>
      </div>
    `;
    return;
  }

  const cardsHtml = filtered.map(product => {
    const isWishlisted = WishlistService.hasItem(product.id);
    const finalPrice = product.price.final;
    const marketPrice = product.price.market || Math.round(finalPrice * 2.5);
    const savedAmount = marketPrice - finalPrice;
    const advanceAmount = Math.round(finalPrice * 0.40);
    const etaText = product.preorder?.etaDays 
      ? `${product.preorder.etaDays[0]}–${product.preorder.etaDays[1]}d` 
      : "12–16d";

    const title = (currentLang === 'bn' && product.nameBn) ? product.nameBn : product.name;
    const imgUrl = product.image || (product.images && product.images[0]) || 'assets/img/ui/placeholder.svg';

    return `
      <div class="col-sm-6 col-lg-4">
        <div class="product-card border border-2 border-danger-subtle position-relative h-100" data-product-id="${product.id}">
          
          <!-- Prominent 60% Discount Flash Badge -->
          <div class="position-absolute top-0 start-0 m-2 z-2">
            <span class="badge bg-danger text-white px-2 py-1 fs-6 shadow-sm">
              <i class="bi bi-fire"></i> FLAT 60% OFF
            </span>
          </div>

          <div class="product-card-thumb-wrap position-relative">
            <button type="button" class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${product.id}" aria-label="Add to wishlist" title="Add to Wishlist">
              <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            <a href="product.html?id=${product.slug || product.id}">
              <img src="${imgUrl}" alt="${escapeHtml(title)}" class="product-card-img" loading="lazy" decoding="async">
            </a>
          </div>

          <div class="product-card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="product-card-brand text-uppercase fw-bold text-muted small">${product.brand || 'Shenzhen Clearance'}</span>
              <span class="badge bg-warning text-dark"><i class="bi bi-clock-history"></i> ${product.preorder?.slotsLeft || 5} Slots Left</span>
            </div>

            <h3 class="product-card-title h6 mb-2">
              <a href="product.html?id=${product.slug || product.id}" class="text-decoration-none text-dark fw-bold line-clamp-2">
                ${escapeHtml(title)}
              </a>
            </h3>

            <div class="product-card-rating mb-2">
              <i class="bi bi-star-fill text-warning"></i>
              <span class="fw-bold text-dark small">${product.rating || '4.9'}</span>
              <span class="text-muted small">(${product.reviewCount || '35'})</span>
            </div>

            <!-- Price & Savings Row -->
            <div class="bg-light p-2 rounded mb-3">
              <div class="d-flex align-items-baseline gap-2 mb-1">
                <span class="h4 text-danger fw-bold mb-0">${formatCurrency(finalPrice)}</span>
                <span class="text-muted text-decoration-line-through small">${formatCurrency(marketPrice)}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <span class="badge bg-success-subtle text-success fw-bold">
                  সেভ করুন: ${formatCurrency(savedAmount)}
                </span>
                <span class="text-secondary">৪০% অগ্রিম: <strong>${formatCurrency(advanceAmount)}</strong></span>
              </div>
            </div>

            <div class="product-card-meta small text-muted mb-3 mt-auto">
              <span><i class="bi bi-airplane-engines text-primary"></i> ${etaText} এয়ার কার্গো</span>
              <span><i class="bi bi-shield-check text-success"></i> ৭ দিনের রিপ্লেসমেন্ট</span>
            </div>

            <div class="product-card-actions d-flex gap-2">
              <button type="button" class="btn btn-whatsapp flex-fill btn-sm js-quick-whatsapp" data-product-id="${product.id}">
                <i class="bi bi-whatsapp"></i> অর্ডার করুন
              </button>
              <button type="button" class="btn btn-outline-primary btn-sm js-quick-cart" data-product-id="${product.id}" title="অর্ডার লিস্টে যোগ করুন">
                <i class="bi bi-bag-plus"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

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
