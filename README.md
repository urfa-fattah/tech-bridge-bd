# TechBridge BD — China Direct WhatsApp Pre-Order Store

A modern, mobile-first e-commerce web platform for technology pre-orders directly from China (Shenzhen / Guangzhou) to Bangladesh. Built strictly according to the **WhatsApp Pre-Order Tech Store Planning Outline** (`ecommerce-website-outline.md`), utilizing an agile, zero-backend architecture (HTML5 semantic, Bootstrap 5.3, custom CSS variables, ES6 JavaScript modules, and modular JSON files).

---

## 🚀 Key Smart Features & Innovations

1. **Intelligent Live Search with Banglish & Synonym Handling:**
   - Real-time dropdown search with keyboard navigation.
   - Handles phonetic typos and Banglish terms (e.g., `erbuds` → `earbuds`, `ghori` → `smart-watch`, `mowse` → `gaming-mice`, `cooler` → `pc-parts`).

2. **Smart Pre-Order Landed Cost Calculator (`request.html` & Home):**
   - Directly converts items found on AliExpress, Taobao, or 1688 into total landed BDT cost.
   - Formula: `(Item USD/CNY × Exchange Rate) + Air Cargo Freight (৳950/kg) + Customs Duty (8%) = Final BDT Price`.
   - Breaks down the **40% Advance Deposit** and outputs a 1-click WhatsApp quote request.

3. **Live China Air Shipment Batch Tracker (`track.html`):**
   - Milestone progress tracking (`Pre-Order Open` → `Shenzhen Sorting` → `Air Cargo Transit` → `Dhaka Customs Clearance` → `Courier Delivery`).
   - Shows active batch flight departure date, slots left, and status updates.

4. **100% Price Transparency & Risk Reversal Block (PDP):**
   - Clearly displays: Factory Price + Air Cargo & Customs = Single Final Price.
   - 0 Hidden fees at delivery. 40% advance booking deposit with 60% Cash on Delivery (COD) upon BD arrival.

5. **Multi-Item Pre-Order List (Cart) to WhatsApp (`cart.html`):**
   - Supports variants, quantities, and customer shipping details.
   - Generates a beautifully formatted WhatsApp pre-order message with item breakdown and totals, plus a 1-click copy button.

6. **Smart "Help Me Choose" Budget Picker:**
   - Quick interactive chips (`৳1,000–৳2,500`, `৳2,500–৳4,000`, `৳4,000–৳6,000`, `৳6,000+`) that instantly filter the catalog without page reloads.

7. **Zero-Backend Persistence (localStorage):**
   - Wishlist and Order List sync automatically across pages with live counter badges on the header and fixed mobile bottom navigation.

---

## 📁 Project Architecture & Folder Structure

```
/e-Commerce
├── index.html                   # Home page (15 psychological trust & conversion sections)
├── shop.html                    # Catalog listing (Sidebar filters, mobile offcanvas, sort)
├── product.html                 # PDP (Dynamic variants, price transparency, sticky mobile CTA)
├── cart.html                    # Pre-Order List (Cart, advance calculations, WhatsApp generator)
├── request.html                 # Custom Product Request & Smart Landed Cost Calculator
├── how-it-works.html            # 4-Step visual pre-order guide & batch explanations
├── track.html                   # Air cargo shipment batch milestone tracker
├── about.html                   # Brand story & Shenzhen/Dhaka logistics hubs
├── founders.html                # Leadership & founders profile (Urfa Hasan Fattah & Shofiur Rahman)
├── contact.html                 # Office address, WhatsApp order desk & contact form
├── policy/
│   ├── pre-order.html           # Pre-Order Policy (40% advance, price lock, cancellation)
│   ├── refund.html              # 7-day replacement & money-back guarantee
│   ├── shipping.html            # Express air route & customs duty transparency
│   └── privacy.html             # Customer privacy & localStorage usage
├── assets/
│   ├── css/
│   │   ├── variables.css        # Colors, fonts, spacing tokens, shadows
│   │   ├── base.css             # Base reset, typography, button variants, animations
│   │   ├── components.css       # Header, bottom nav, product card, batch stepper, toasts
│   │   └── pages.css            # Page-specific responsive layout styles
│   ├── js/
│   │   ├── config.js            # Global store configs, currency formatters, BDT rates
│   │   ├── dataService.js       # Central data layer with caching & offline fallback
│   │   ├── render.js            # Product card, reviews, categories, and toast renderers
│   │   ├── filters.js           # Multi-criteria catalog filtering & sorting engine
│   │   ├── search.js            # Live fuzzy search & synonym mapper
│   │   ├── cart.js              # Order list state manager with localStorage
│   │   ├── wishlist.js          # Wishlist state manager with localStorage
│   │   ├── smartCalculator.js   # Landed cost estimator for Chinese imports
│   │   ├── whatsapp.js          # WhatsApp message generator & link dispatcher
│   │   └── main.js              # Global event delegation & UI bootstrap
│   └── img/
│       └── ui/
│           └── placeholder.svg  # High-quality fallback SVG
├── data/
│   ├── settings.json            # Store info, WhatsApp number, USD/CNY exchange rates
│   ├── categories.json          # Bilingual categories & subcategories
│   ├── brands.json              # Top Chinese tech brands (Moondrop, Attack Shark, etc.)
│   ├── shipments.json           # Shipment batches with milestones and dates
│   ├── offers.json              # Active campaigns and flash drops
│   ├── reviews.json             # Real customer testimonials with verified batch tags
│   ├── faqs.json                # Objection handling FAQ data
│   ├── pages/home.json          # Home hero slides & layout configuration
│   └── products/
│       ├── index.json           # Lightweight index for fast search & listing
│       ├── audio.json           # TWS earbuds, audiophile IEMs, speakers
│       ├── smart-watch.json     # AMOLED smartwatches & fitness bands
│       ├── gaming.json          # PAW3395 mice, gasket mechanical keyboards, gamepads
│       ├── pc-parts.json        # CPU coolers, Gen4 NVMe SSDs, fans
│       ├── power.json           # GaN chargers (65W-100W), cables, power banks
│       └── mobile-accessories.json # Aluminum stands, semiconductor phone coolers
└── ecommerce-website-outline.md # Complete planning outline
```

---

## 🛠️ How to Run Locally

Because the project uses standard ES6 JavaScript modules (`import`/`export`) and JSON `fetch()`, browsers require an HTTP server for local testing (due to security CORS policies on direct `file://` protocols):

### Option 1: VS Code Live Server (Recommended)
1. Open this folder in **VS Code**.
2. Right click on `index.html` → Click **"Open with Live Server"**.

### Option 2: Python Built-In Server
Run this in PowerShell or Terminal inside `f:\e-Commerce`:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000` in any browser.

### Option 3: Node `npx serve`
```bash
npx serve .
```

---

## ⚙️ How to Update Prices, Products & WhatsApp Number

- **WhatsApp Order Line Configured:**
  Set to `01933407672` (`8801933407672`). Configured globally in `data/settings.json` and `assets/js/config.js`.
- **To Adjust Currency / Dollar Exchange Rate:**
  Edit `data/settings.json` and change `"usdToBdt": 125` or `"cnyToBdt": 17.5`.
- **To Add a Product:**
  Add product entry in its category file (e.g. `data/products/audio.json`) and add the lightweight item in `data/products/index.json`.

---

## 🎯 Psychology & Business Compliance
- **No Fake Urgency:** Scarcity reflects actual shipment batch capacity (`slotsLeft`).
- **Ethical Social Proof:** Authentic customer reviews tagged with verified batch IDs.
- **Cognitive Ease:** Mobile-first layout with high-contrast buttons, Bengali/English hybrid tone, and 2-tap WhatsApp checkout.
