/**
 * Central Data Service with Smart LocalStorage Caching & Stale-While-Revalidate
 * TechBridge BD — China Direct Pre-Order Platform
 * 
 * Features:
 * - 0ms instantaneous cache hit from localStorage
 * - Automatic background revalidation (Stale-While-Revalidate)
 * - Safe fallback datasets for offline & file:// executions
 * - Preload engine during idle browser moments for zero navigation delay
 */

const CACHE = {};
const LS_CACHE_PREFIX = 'techbridge_cache_v2_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes fresh window

function getResolvedPath(path) {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/') || path.startsWith('../')) {
    return path;
  }
  const isInSubdir = window.location.pathname.includes('/policy/');
  return isInSubdir ? `../${path}` : path;
}

/**
 * Perform background revalidation without blocking UI
 */
function revalidateInBackground(finalPath, path, cacheKey) {
  fetch(finalPath)
    .then(res => res.ok ? res.json() : null)
    .then(freshData => {
      if (freshData) {
        CACHE[path] = freshData;
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: freshData
          }));
        } catch (e) {}
      }
    })
    .catch(() => {});
}

/**
 * Generic fetch with localStorage Stale-While-Revalidate caching
 */
async function fetchJSON(path) {
  // 1. In-memory hot cache
  if (CACHE[path]) {
    return CACHE[path];
  }

  const finalPath = getResolvedPath(path);
  const cacheKey = LS_CACHE_PREFIX + path;

  // 2. LocalStorage fast retrieval (0ms latency)
  let cachedEntry = null;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      cachedEntry = JSON.parse(raw);
    }
  } catch (e) {
    console.warn("LocalStorage read error:", e);
  }

  const isFresh = cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_TTL_MS);

  if (cachedEntry && cachedEntry.data) {
    CACHE[path] = cachedEntry.data;

    // If cache is stale, trigger non-blocking revalidation in background
    if (!isFresh) {
      revalidateInBackground(finalPath, path, cacheKey);
    }
    return cachedEntry.data;
  }

  // 3. Network fetch if no cached copy exists
  try {
    const response = await fetch(finalPath);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} loading ${finalPath}`);
    }
    const data = await response.json();
    CACHE[path] = data;

    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {}

    return data;
  } catch (err) {
    console.warn(`Failed to fetch ${finalPath}, checking fallback:`, err);
    if (cachedEntry && cachedEntry.data) {
      return cachedEntry.data;
    }
    return getFallbackData(path);
  }
}

/**
 * Public Data Service API
 */
export const DataService = {
  async getSettings() {
    return await fetchJSON('data/settings.json');
  },

  async getCategories() {
    return await fetchJSON('data/categories.json');
  },

  async getBrands() {
    return await fetchJSON('data/brands.json');
  },

  async getShipments() {
    return await fetchJSON('data/shipments.json');
  },

  async getActiveShipment() {
    const shipments = await this.getShipments();
    return shipments.find(s => s.status === 'booking_open') || shipments[0];
  },

  async getOffers() {
    return await fetchJSON('data/offers.json');
  },

  async getReviews() {
    return await fetchJSON('data/reviews.json');
  },

  async getFaqs() {
    return await fetchJSON('data/faqs.json');
  },

  async getHomePageData() {
    return await fetchJSON('data/pages/home.json');
  },

  async getAllProducts() {
    return await fetchJSON('data/products/index.json');
  },

  async getProductById(idOrSlug) {
    if (!idOrSlug) return null;
    const allProducts = await this.getAllProducts();
    const target = allProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (!target) return null;

    // Try to load detailed product data from category json
    try {
      const categoryFile = `data/products/${target.category}.json`;
      const categoryProducts = await fetchJSON(categoryFile);
      const detailed = categoryProducts.find(p => p.id === target.id);
      if (detailed) return detailed;
    } catch (e) {
      // fallback to target in index
    }
    return target;
  },

  async getProductsByCategory(categorySlug) {
    const all = await this.getAllProducts();
    if (!categorySlug || categorySlug === 'all') return all;
    return all.filter(p => p.category === categorySlug);
  },

  async getProductsByBudget(min, max) {
    const all = await this.getAllProducts();
    return all.filter(p => {
      const price = p.price.final;
      if (max !== undefined) {
        return price >= min && price <= max;
      }
      return price >= min;
    });
  },

  async searchProducts(query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const all = await this.getAllProducts();

    return all.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const nameBnMatch = p.nameBn && p.nameBn.includes(q);
      const brandMatch = p.brand && p.brand.toLowerCase().includes(q);
      const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const catMatch = p.category && p.category.toLowerCase().includes(q);
      return nameMatch || nameBnMatch || brandMatch || tagMatch || catMatch;
    });
  },

  /**
   * Preload critical datasets into localStorage during idle time
   */
  preloadAll() {
    const idleHandler = window.requestIdleCallback || ((cb) => setTimeout(cb, 500));
    idleHandler(() => {
      this.getAllProducts();
      this.getCategories();
      this.getBrands();
      this.getShipments();
      this.getSettings();
    });
  },

  /**
   * Clear TechBridge localStorage cache
   */
  clearCache() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(LS_CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    for (const k in CACHE) delete CACHE[k];
  }
};

/**
 * Built-in fallback dataset ensuring local file:// opening runs reliably
 */
function getFallbackData(path) {
  if (path.includes('settings.json')) {
    return {
      storeName: "TechBridge BD",
      tagline: "China theke direct, original tech sera dame",
      whatsapp: "8801933407672",
      phone: "+880 1933-407672",
      currency: "৳",
      advancePercent: 40,
      usdToBdt: 125,
      cnyToBdt: 17.5,
      announcement: "✈️ Next China Air Cargo Shipment: 25 Oct Batch — Booking closes in 3 days!"
    };
  }
  return [];
}

// Automatically trigger idle preloading
if (typeof window !== 'undefined') {
  DataService.preloadAll();
}
