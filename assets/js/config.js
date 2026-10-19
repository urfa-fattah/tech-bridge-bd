/**
 * Global Configuration & Utilities
 * TechBridge BD — WhatsApp Pre-Order Store
 */

export const APP_CONFIG = {
  storeName: "TechBridge BD",
  tagline: "China theke direct, original tech sera dame",
  taglineEn: "Direct from China, authentic gadgets at unbeatable prices",
  whatsappNumber: "8801933407672", // Direct WhatsApp line (01933407672)
  phoneDisplay: "+880 1933-407672",
  phoneRaw: "01933407672",
  email: "support@techbridgebd.com",
  officeAddress: "Suite 408, Level 4, Multiplan Center, New Elephant Road, Dhaka-1205",
  
  currencySymbol: "৳",
  currencyCode: "BDT",
  advancePercent: 40,
  defaultEtaDays: [12, 18],
  usdToBdt: 125,
  cnyToBdt: 17.5,
  airFreightPerKg: 950,
  
  storageKeys: {
    cart: "techbridge_cart_v1",
    wishlist: "techbridge_wishlist_v1",
    recentlyViewed: "techbridge_recent_v1",
    language: "techbridge_lang_v1",
    announcementDismissed: "techbridge_announcement_v1",
    customCalculatorCache: "techbridge_calc_v1"
  }
};

/**
 * Format currency in Bangladeshi Taka (e.g. ৳1,850)
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "৳0";
  return `${APP_CONFIG.currencySymbol}${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Format date string (e.g. 25 Oct 2026)
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateString;
  }
}

/**
 * Get active language ('bn' or 'en')
 */
export function getActiveLanguage() {
  return localStorage.getItem(APP_CONFIG.storageKeys.language) || 'bn';
}

/**
 * Set active language
 */
export function setActiveLanguage(lang) {
  localStorage.setItem(APP_CONFIG.storageKeys.language, lang);
  window.location.reload();
}
