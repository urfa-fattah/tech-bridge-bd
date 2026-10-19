# TechBridge BD — Developer Guide: How to Add Products, Data & Connect Payment APIs

This document provides a comprehensive, step-by-step guide for managing data in the **TechBridge BD** pre-order e-commerce platform. Because the website is engineered with a modern, zero-database architecture (pure vanilla HTML5, CSS3, ES6 Modules, and JSON data files), anyone can add products, categories, brands, and shipments simply by editing the JSON files in the `data/` directory.

---

## Table of Contents
1. [Project Data Architecture](#1-project-data-architecture)
2. [How to Add a New Product](#2-how-to-add-a-new-product)
3. [Landed Cost & Pre-Order Price Calculation Formula](#3-landed-cost--pre-order-price-calculation-formula)
4. [How to Add Categories and Subcategories](#4-how-to-add-categories-and-subcategories)
5. [How to Add Brands](#5-how-to-add-brands)
6. [How to Manage Air Cargo Shipment Batches](#6-how-to-manage-air-cargo-shipment-batches)
7. [How to Connect Real Payment Gateway APIs (bKash, Nagad, SSLCOMMERZ)](#7-how-to-connect-real-payment-gateway-apis)
8. [Language & Translation System (Bangla <-> English)](#8-language--translation-system)
9. [Theme Customization (Light & Dark Mode)](#9-theme-customization)

---

## 1. Project Data Architecture

All dynamic contents on TechBridge BD are stored inside the `data/` folder:

```
f:\e-Commerce\data/
├── products/
│   └── index.json             <-- Master product catalog (All pre-order products)
├── categories.json            <-- Categories, subcategories & icons
├── brands.json                <-- Brand directory (Moondrop, Attack Shark, etc.)
├── shipments.json             <-- Live flight cargo batches & tracking milestones
├── settings.json              <-- Global business settings, helpline, addresses
├── faqs.json                  <-- Frequently asked questions
├── offers.json                <-- Seasonal campaigns and promo banners
└── reviews.json               <-- Verified customer reviews
```

All data is loaded client-side asynchronously by `assets/js/dataService.js` and rendered via `assets/js/render.js`.

---

## 2. How to Add a New Product

Open `data/products/index.json`. Each product is a JSON object in the main array.

### Product Object Template
To add a new product, copy and paste this template at the beginning or end of `data/products/index.json`:

```json
{
  "id": "gam-0004",
  "slug": "vgn-dragonfly-f1-pro-max-mouse",
  "name": "VGN Dragonfly F1 Pro Max Wireless Mouse",
  "nameBn": "ভিজিএন ড্রাগনফ্লাই এফ১ প্রো ম্যাক্স ওয়্যারলেস মাউস",
  "brand": "vgn",
  "category": "gaming",
  "subcategory": "gaming-mice",
  "tags": ["paw3395", "49g", "wireless", "4k-polling"],
  "price": {
    "base": 4200,
    "shippingCustoms": 650,
    "final": 4850,
    "market": 6500,
    "currency": "BDT"
  },
  "preorder": {
    "type": "preorder",
    "etaDays": [12, 16],
    "advancePercent": 40,
    "batch": "BATCH-2026-10-25",
    "slotsLeft": 10
  },
  "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  "images": [
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"
  ],
  "specs": {
    "Sensor": "PAW3395 (26,000 DPI)",
    "Weight": "49g Ultra-lightweight",
    "Battery": "500mAh (Up to 130 Hours)",
    "Connectivity": "Tri-Mode (2.4G / Bluetooth / Type-C)",
    "Warranty": "6 Months TechBridge Official Replacement"
  },
  "rating": 4.9,
  "reviewCount": 34,
  "featured": true,
  "new": true
}
```

### Field Definitions:
- `id`: Unique identifier (prefix with category like `aud-0003`, `wat-0003`, `gam-0004`, `pc-0003`, `pow-0003`).
- `slug`: URL slug used in the browser address: `product.html?id=vgn-dragonfly-f1-pro-max-mouse`.
- `name`: English title shown in title bars and invoices.
- `nameBn`: Bengali title for Bengali language mode.
- `brand`: Must match an `id` inside `data/brands.json` (lowercase, e.g. `moondrop`, `qcy`, `vgn`).
- `category`: Must match an `id` inside `data/categories.json` (e.g. `audio`, `gaming`, `smart-watch`, `pc-parts`, `power`, `mobile-accessories`).
- `subcategory`: Must match one of the subcategories defined in `data/categories.json`.
- `tags`: Keywords used by the real-time search engine (`PAW3395`, `Bluetooth`, `ANC`).
- `price.base`: China purchase cost converted to BDT.
- `price.shippingCustoms`: Air cargo freight + customs clearance charge.
- `price.final`: Final landed price in BDT that customer pays.
- `price.market`: Market reference price in local BD shops (used to calculate `-XX%` discount).
- `preorder.etaDays`: `[min_days, max_days]`, e.g. `[12, 16]` days delivery.
- `preorder.advancePercent`: Always `40` (40% advance booking deposit).
- `preorder.batch`: Current active shipment batch ID from `data/shipments.json`.
- `image`: Primary thumbnail displayed on product cards.
- `images`: Gallery of high-resolution product photos on the detail page.
- `specs`: Key-value pairs rendered in the technical specification table on `product.html`.
- `featured`: `true` to feature on the homepage slider and highlights.
- `new`: `true` to display in "New Launches".

### 2.1 How to Add Products to the 60% Special Offers Page (`offers.html`)
To make a product automatically appear on the Special 60% Offers page (`offers.html`), set these additional fields on the product object:
```json
{
  "id": "off-0007",
  "slug": "soundpeats-capsule3-pro-plus-anc",
  "name": "SoundPEATS Capsule3 Pro+ Hi-Res ANC Earbuds",
  "nameBn": "সাউন্ডপিটস ক্যাপসুল৩ প্রো প্লাস হাই-রেজ এএনসি ইয়ারবাডস",
  "brand": "soundpeats",
  "category": "audio",
  "isSpecialOffer": true,
  "discountPercent": 60,
  "tags": ["anc", "hi-res", "ldac", "60-percent-off"],
  "price": {
    "base": 2400,
    "shippingCustoms": 400,
    "final": 2800,
    "market": 7000,
    "currency": "BDT"
  },
  "preorder": {
    "type": "preorder",
    "etaDays": [12, 16],
    "advancePercent": 40,
    "batch": "BATCH-2026-10-25",
    "slotsLeft": 4
  }
}
```
Key requirements for 60% Offer Items:
1. `"isSpecialOffer": true` (Triggers inclusion in `offers.html`)
2. `"discountPercent": 60` (Displays the 60% badge)
3. `"price.market"` set to the original market price so the savings pill automatically calculates: `market - final`.

---

## 3. Landed Cost & Pre-Order Price Calculation Formula

When pricing items from China (Taobao, JD.com, 1688, or AliExpress), use this transparent formula:

$$\text{Final Landed BDT} = (\text{Product CNY} \times 17.5) + (\text{Weight in KG} \times 950) + \text{Customs Fee} + \text{Margin}$$

### Example Breakdown:
- **Product Cost in China:** ¥180 (CNY)
- **Currency Rate:** $1\text{ CNY} \approx 17.5\text{ BDT} \implies 180 \times 17.5 = \text{৳3,150}$
- **Weight:** 0.4 kg
- **Air Freight ($950\text{ BDT/kg}$):** $0.4 \times 950 = \text{৳380}$
- **Customs & Clearance:** ৳250
- **Service & Insurance Margin:** ৳450
- **Final Landed Price:** $3,150 + 380 + 250 + 450 = \mathbf{\text{৳4,230}}$
- **40% Pre-Order Advance Required:** $\mathbf{\text{৳1,692}}$
- **Remaining 60% Due on Delivery:** $\mathbf{\text{৳2,538}}$

---

## 4. How to Add Categories and Subcategories

Open `data/categories.json`. To add a new category:

```json
{
  "id": "cameras",
  "name": "Action Cameras & Drones",
  "nameBn": "অ্যাকশন ক্যামেরা ও ড্রোন",
  "icon": "bi-camera-video",
  "slug": "cameras",
  "order": 8,
  "featured": true,
  "subcategories": [
    { "id": "action-cam", "name": "4K Action Cameras", "nameBn": "৪কে অ্যাকশন ক্যামেরা" },
    { "id": "mini-drones", "name": "GPS Mini Drones", "nameBn": "মিনি ড্রোন" }
  ]
}
```

*Note: For the `icon`, choose any valid [Bootstrap Icon](https://icons.getbootstrap.com) class name (e.g. `bi-camera-video`).*

---

## 5. How to Add Brands

Open `data/brands.json`. Add the brand entry:

```json
{ 
  "id": "vgn", 
  "name": "VGN Lab", 
  "country": "China", 
  "tier": "Ultra-lightweight Esports Leader" 
}
```

---

## 6. How to Manage Air Cargo Shipment Batches

Open `data/shipments.json`. Each flight batch represents a live cargo consolidation from Shenzhen/Guangzhou to Dhaka:

```json
{
  "batchId": "BATCH-2026-11-05",
  "title": "Air Cargo Batch #85",
  "orderCutoff": "2026-11-05",
  "departureDate": "2026-11-07",
  "arrivalEstimate": "2026-11-15",
  "status": "booking_open",
  "statusLabel": "Pre-Order Booking Open",
  "statusLabelBn": "প্রি-অর্ডার বুকিং চলছে",
  "totalSlots": 50,
  "slotsBooked": 5,
  "slotsLeft": 45,
  "currentMilestone": 1,
  "milestones": [
    { "id": 1, "title": "Pre-Order Open", "desc": "Bookings accepted with 40% advance", "done": true, "current": true },
    { "id": 2, "title": "Shenzhen Sorting", "desc": "Direct factory pickup & inspection", "done": false, "current": false },
    { "id": 3, "title": "Air Cargo Transit", "desc": "Direct flight to Dhaka (DAC)", "done": false, "current": false },
    { "id": 4, "title": "Dhaka Customs Clear", "desc": "Official duty & port clearance", "done": false, "current": false },
    { "id": 5, "title": "Doorstep Delivery", "desc": "Steadfast / Pathao courier delivery", "done": false, "current": false }
  ],
  "notes": "Guaranteed arrival within 12-16 days. Zero hidden customs fee."
}
```

### Milestone Progression:
As the cargo moves, simply update `currentMilestone` (from `1` to `5`) and set the `done: true` flags. The live tracker on `track.html` will automatically update the progress bar and timeline!

---

## 7. How to Connect Real Payment Gateway APIs

The payment architecture in `assets/js/paymentGateway.js` is pre-engineered as a clean facade. It is currently operating in **Demo Mode (Sandbox)** with realistic OTP and PIN verification dialogs, transaction ID generators, and WhatsApp sync.

### Step 1: Switch from Demo to Production Mode
In `assets/js/paymentGateway.js`, change line 15:

```javascript
export const PAYMENT_CONFIG = {
  // Set isDemo to false when deploying live merchant credentials
  isDemo: false,
  advancePercent: 40,
  currency: "BDT",
  ...
```

### Step 2: Connect bKash Direct Checkout API
In `assets/js/paymentGateway.js`:
1. Add your merchant credentials in `PAYMENT_CONFIG.providers.bkash`:
   ```javascript
   bkash: {
     id: "bkash",
     appKey: "YOUR_BKASH_APP_KEY",
     appSecret: "YOUR_BKASH_APP_SECRET",
     merchantNumber: "01933407672",
     createPaymentUrl: "https://your-backend.com/api/bkash/create",
     executePaymentUrl: "https://your-backend.com/api/bkash/execute"
   }
   ```
2. In `PaymentGateway.executeProductionApi()`, trigger your backend endpoint which calls bKash's `/tokenized/checkout/create`:
   ```javascript
   const response = await fetch(PAYMENT_CONFIG.providers.bkash.createPaymentUrl, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       amount: advanceAmount,
       invoiceNumber: `TB-${Date.now()}`,
       customerPhone: phone
     })
   });
   const data = await response.json();
   if (data.bkashURL) {
     window.location.href = data.bkashURL; // Redirect to official bKash gateway page
   }
   ```

### Step 3: Connect Nagad / SSLCOMMERZ
Follow the exact same flow by updating `PAYMENT_CONFIG.providers.nagad` and `PAYMENT_CONFIG.providers.sslcommerz`. For SSLCOMMERZ, send order details to your backend session creator and redirect customer to `data.GatewayPageURL`.

---

## 8. Language & Translation System (Bangla <-> English)

The bilingual translation engine is located in `assets/js/i18n.js`.
- It maintains full dictionaries for `bn` (Bangla default) and `en` (English).
- Any HTML element containing `data-i18n="translation_key"` will instantly update when the user clicks the `EN | বাংলা` button in the header.
- Any input element with `data-i18n-placeholder="translation_key"` will translate its placeholder text.
- To add a new translation string, simply add the key to both `bn` and `en` objects in `assets/js/i18n.js`.

---

## 9. Theme Customization (Light & Dark Mode)

The theme switcher is located in `assets/js/theme.js` with tokens in `assets/css/variables.css`.
- Light mode is the default (`:root`).
- Dark mode is triggered via `[data-theme="dark"]` on the root `<html>` element.
- The user's preference is automatically remembered in `localStorage.getItem('techbridge_theme_v1')`.
- All CSS variables for surfaces, text, inputs, cards, borders, and shadows transition smoothly.

---

---

## 10. Helpline & Founder Credentials Verification

- **Direct WhatsApp Line:** `+880 1933-407672` (`8801933407672` in wa.me links)
- **Physical Office Address:** Suite 408, Level 4, Multiplan Center, New Elephant Road, Dhaka-1205
- **Founder & Lead UX/UI Designer:** Urfa Hasan Fattah
- **Co-Founder & Head of Operations:** Shofiur Rahman

---

## 11. Smart LocalStorage Caching & Stale-While-Revalidate

To ensure maximum speed, TechBridge BD uses a Stale-While-Revalidate caching engine located in `assets/js/dataService.js`:
- **0ms Response Time:** When a user visits the shop, product page, or performs live search, data is served instantly from `localStorage` (`techbridge_cache_v2_*`).
- **Silent Background Sync:** If data in `localStorage` is older than 15 minutes, a silent fetch revalidates and refreshes the cache without stalling the UI.
- **Idle Preloading:** On first page visit, `DataService.preloadAll()` automatically warms the cache during browser idle time using `requestIdleCallback`.

### How to Force-Refresh Cache After Adding New Products:
During local editing, if you add a new product and want to see it instantly without waiting for the 15-minute TTL:
1. **Option A (Browser DevTools):** Open Browser DevTools (`F12`), switch to **Application** -> **Local Storage**, and clear keys starting with `techbridge_cache_v2_`.
2. **Option B (Console Command):** Open browser console (`Ctrl + Shift + J` or `F12`) and run:
   ```javascript
   DataService.clearCache();
   location.reload();
   ```
3. **Option C (Hard Refresh):** Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac).

---

## 12. Modular HTML Components & 60% Special Offers Page

### 12.1 Modular Component Files (`components/`)
Common shared page sections are now modularized in the `components/` directory:
- `components/announcement.html` — The top dismissable announcement capsule.
- `components/header.html` — The sticky header with brand logo, search bar, theme toggle, language switcher, cart/wishlist counters, WhatsApp direct desk, and desktop sub-navbar.
- `components/footer.html` — Global unified footer with company info, quick links, policy links, office hours, and founder credits.
- `components/mobile-nav.html` — Fixed bottom navigation bar for mobile devices.
- `components/mobile-offcanvas.html` — Offcanvas slide drawer menu for mobile screens.
- `components/floating-whatsapp.html` — Floating pulse WhatsApp action button.

The orchestrator `assets/js/components.js` automatically synchronizes these components and highlights active page links.

### 12.2 Special 60% Discount Offers Page (`offers.html`)
The website now features a dedicated clearance offers page at `offers.html`:
- To mark any product as a 60% discount item, simply add `"isSpecialOffer": true` and `"discountPercent": 60` in `data/products/index.json`.
- It includes a real-time countdown timer, category filters (Gaming, Audio, Watch, Power, PC), and automatic savings calculation badges.
- All product names and badges dynamically render in English or Bengali depending on the selected language.

