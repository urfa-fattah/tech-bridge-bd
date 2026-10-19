# WhatsApp Pre-Order Tech Store — Complete Website Planning Outline

> **Business model:** Customer website e product dekhe → WhatsApp e amader sathe kotha bole order kore → amra China theke pre-order niye ene delivery dei.
> **Product category:** Technology (gadgets, accessories, PC parts, smart devices, etc.)
> **Tech constraint:** Only frontend (HTML, CSS, JavaScript, Bootstrap 5), data thakbe JSON file e.
> **Primary device:** Mobile phone (mobile-first design).
> **Reference style:** Star Tech, Ryans (tech catalog structure), Fabrilife (brand feel, clean modern look).

*Note: Reference site gulo ami live open kore scrape kori ni. Ei outline e oi site gulor well-known layout pattern (mega-menu, category grid, product card, filter, sticky header) follow kora hoyeche. Design e kono site er logo/image/text copy kora jabe na, shudhu pattern follow korte hobe.*

---

## 0. Roles Used In This Plan

| Role | Ei plan e kon decision ta kora |
|---|---|
| Senior Web Developer | Architecture, JSON structure, performance, folder structure |
| Senior Psychologist | Trust building, decision-making triggers, friction reduction |
| Experienced Salesman | Pre-order offer, pricing display, objection handling, WhatsApp script |
| Senior UI/UX Designer | Layout, mobile flow, design system, components |

---

## 1. Business Reality Check (Pre-order Model er Challenge)

Pre-order model e customer er **sobcheye boro bhoy**:
1. "Taka dile product ashbe to?" (Trust)
2. "Koto din lagbe?" (Time uncertainty)
3. "Product asol hobe to? Kharap hole ki hobe?" (Quality / Return risk)
4. "Customs e extra charge lagbe na to?" (Hidden cost)

Tai website er **pura design er main kaj** hocche ei 4 ta bhoy komano. Sob section ei goal ke serve korbe.

---

## 2. Four Outline Concepts

### Outline A — "Catalog-First Marketplace" (Star Tech / Ryans style)
- Home e mega-menu, category grid, bohu product section (New, Popular, Deals).
- Strong filter, sort, compare.
- **Pros:** Familiar, product discovery easy, SEO bhalo.
- **Cons:** Onek bhir lagte pare, trust/brand feel kom, pre-order concept alada kore bujhano hoy na.

### Outline B — "WhatsApp-First Concierge"
- Home e boro ekta "Tell us what you want" box + WhatsApp CTA. Product list simple.
- Customer chat e dhukte bhoy pay na, personal service feel.
- **Pros:** Conversion-focused, amader model er sathe perfect match.
- **Cons:** Browse korte chaile limited, SEO weak, scale korle hard.

### Outline C — "Brand Story / Drop Style" (Fabrilife style)
- Strong branding, collection/campaign based sections, lifestyle imagery, clean minimal.
- **Pros:** Professional brand feel, emotional connect.
- **Cons:** Tech buyer ra spec/price dekhte chay, story diye shobar convince hoy na.

### Outline D — "Guided Finder"
- Customer quiz/steps: budget → use case (gaming / office / student) → recommended products.
- **Pros:** Choice overload komay, beginner der jonno bhalo.
- **Cons:** Experienced buyer der jonno slow, only main flow hishebe weak.

### Scoring (1–5)

| Criteria | A | B | C | D |
|---|---|---|---|---|
| Mobile conversion | 3 | 5 | 3 | 4 |
| Trust building | 3 | 4 | 4 | 3 |
| Product discovery | 5 | 2 | 3 | 4 |
| Fit with WhatsApp pre-order model | 3 | 5 | 2 | 3 |
| SEO / long-term growth | 5 | 2 | 3 | 2 |
| Easy to build with JSON + frontend only | 4 | 5 | 4 | 3 |
| **Total** | **23** | **23** | **19** | **19** |

### Final Decision: **Hybrid "A + B" with ideas from C and D**

- **Skeleton = A** (catalog, categories, filter, search) → discovery ar SEO er jonno.
- **Heart = B** (WhatsApp order everywhere, "Can't find it? Request any product") → amader main sales channel.
- **Brand look = C** (clean, modern, consistent identity, trust section).
- **Smart helper = D-lite** ("Help me choose" budget picker, shudhu ekta chhoto section, full quiz na).

---

## 3. Psychology Plan (Ethical — no fake tricks)

> Rule: **Fake scarcity, fake countdown, fake review kora jabe na.** Short-term sales hoy, long-term brand nosto hoy. Sob trigger real data diye cholbe.

| Psychological Principle | Kothay use hobe | Kibhabe |
|---|---|---|
| **Trust / Risk Reversal** | Header, product page, checkout | "Original product guarantee", "Wrong/damaged hole refund/replace", clear policy link |
| **Hick's Law (choice kom)** | Home, category | Max 6-8 category icon, "Top picks" curated, filter simple |
| **Anchoring** | Product card | Market price (strikethrough) vs amader pre-order price |
| **Social Proof** | Home, product page | Real customer photo, WhatsApp chat screenshot (permission niye), delivered order counter |
| **Loss Aversion (real)** | Pre-order batch | "Next China shipment e seat ache: 12 ti baki" (real stock/batch limit hole tobei) |
| **Reciprocity** | Home, footer | Free "Product guide / buying tips" content, free consultation on WhatsApp |
| **Commitment & Consistency** | Order flow | Chhoto step: product select → quantity → WhatsApp message (small yes → big yes) |
| **Cognitive Ease** | Everywhere | Bangla + English mix, bold price, short sentence, clear icon |
| **Transparency Effect** | Product page | Price breakdown: product + shipping + customs = final price (hidden cost nai) |
| **Authority** | About, product | "Authorized/trusted source" info, warranty details, spec accuracy |
| **Peak-End Rule** | After order | Order confirm page + WhatsApp reply ta friendly, tracking update dewa |
| **Endowment Effect** | Wishlist/Cart | Customer save kore rakhle "tomar wishlist" feel hoy, return kore |
| **Urgency (real only)** | Offer banner | Real offer end date, real batch cut-off date |

### Salesman Mindset (Objection Handling on Page)
- "Dam beshi?" → Price comparison note + "Pre-order discount".
- "Bishash hoy na" → Trust section + real reviews + refund policy.
- "Koto din?" → Har product e **ETA** (e.g. 12–20 days) stated.
- "Original ki?" → Brand authorized tag / purchase proof ashbe.
- "Advance koto?" → Clear advance % (e.g. 30–50%) and payment method visible.

---

## 4. Customer Journey (Mobile-First)

```
Landing (Ad/Social/Search)
   ↓
Home: category / search / "Request product"
   ↓
Category page: filter, sort
   ↓
Product page: gallery, price, ETA, trust, specs
   ↓
[Order on WhatsApp] button  ← sticky, always visible
   ↓
WhatsApp opens with pre-filled message (product, variant, qty, price)
   ↓
Salesman confirms: price, advance, ETA
   ↓
Advance payment (bKash/Nagad) → Order confirmed
   ↓
Updates: ordered from China → shipped → arrived BD → delivered
   ↓
Review request + referral
```

**Friction rule:** Product page theke WhatsApp e jete **maximum 2 tap**.

---

## 5. Sitemap

```
Home
├── Shop (All Products)
│   ├── Category pages (Mobile Accessories, Audio, Smart Watch, PC Parts, Gaming, Networking, Smart Home, Camera, Power, Others)
│   │   └── Sub-category (optional)
│   └── Brand pages
├── Product Detail Page (PDP)
├── Pre-Order Offers / Deals
├── Request a Product (custom order form → WhatsApp)
├── How Pre-Order Works
├── Track My Order (WhatsApp based / simple status guide)
├── Compare (optional phase 2)
├── Wishlist
├── Cart (Order List)  → "Send all on WhatsApp"
├── Blog / Buying Guides
├── About Us
├── Contact
├── Reviews / Customer Stories
└── Policies
    ├── Pre-Order Policy
    ├── Refund & Replacement
    ├── Shipping & Delivery
    ├── Privacy Policy
    └── Terms & Conditions
```

---

## 6. Page-by-Page Plan (Mobile-First Wireframe in Text)

### 6.1 Global Elements

**Top announcement bar** (slim, dismissible): "📦 Next China shipment: 25 Oct — order before 20 Oct"
**Header (sticky):**
- Mobile: Hamburger | Logo | Search icon | Wishlist | Cart
- Desktop: Logo | Wide search bar | WhatsApp number | Wishlist | Cart
- Under header (desktop): category mega-menu.

**Mobile bottom navigation (fixed):** Home | Categories | **WhatsApp (center, highlighted)** | Wishlist | Cart
**Floating WhatsApp button** (bottom-right, desktop + mobile) with soft pulse animation (subtle).

**Footer:** Trust badges, quick links, policies, social, payment methods, WhatsApp, address/hours.

### 6.2 Home Page (Section Order = Psychology Order)

1. **Hero slider (2–3 slides):** Strong promise. e.g. "China theke direct — Original gadget, pre-order e sera dam". CTA: "Shop Now" + "WhatsApp e Order".
2. **Trust strip (4 icon):** ✔ Original Product | ✔ Safe Advance | ✔ Refund Policy | ✔ 7000+ Happy… (shudhu real number)
3. **Search with quick suggestions:** "Search korun: Earbuds, Smart Watch, SSD…"
4. **Category grid (8 icons, 2 rows × 4 mobile):** Icon-based, large tap area.
5. **How Pre-Order Works (4 steps, simple):** Choose → WhatsApp → Pay advance → Receive. *Eta ei section ta most important trust builder.*
6. **Hot Pre-Order Deals:** Horizontal scroll product cards (real offer deadline).
7. **Budget Picker (D-lite):** "Tomar budget koto?" → ৳500–1000 | 1000–3000 | 3000–10000 | 10000+ (filter shortcut).
8. **New Arrivals / Trending:** Product carousel.
9. **Request Any Product (CTA block):** "Khujchen onno kichu? Link ba nam pathan, amra China theke ene dibo" → WhatsApp.
10. **Customer reviews / WhatsApp chat screenshots / delivered photos.**
11. **Why Choose Us (comparison):** Local market vs us (price, variety, warranty).
12. **Delivery & Payment info (bKash, Nagad, COD after arrival if applicable).**
13. **FAQ accordion (top 6).**
14. **Blog / Buying guides (3 cards).**
15. **Final CTA:** "Ekhoni WhatsApp e kotha bolun".

### 6.3 Category / Listing Page
- Breadcrumb
- Title + product count
- **Sticky filter bar (mobile):** Filter button | Sort dropdown. Filter ashbe bottom-sheet/offcanvas e (Bootstrap Offcanvas).
- Filters: Price range, Brand, Rating, Availability type (Pre-order / In stock), ETA, Specs (category based).
- Product grid: 2 columns mobile, 3 tablet, 4 desktop.
- Load more button (infinite scroll na, simple "Load more" JS).

### 6.4 Product Card (Component)
```
[Image]            ❤ (wishlist)
[Badge: Pre-Order | -15% | New]
Product name (2 line max)
★ 4.7 (32)
৳ 1,850   ৳̶2̶,̶3̶0̶0̶     (anchor price)
ETA: 12–18 days
[Quick WhatsApp Order]  [Add to list]
```

### 6.5 Product Detail Page (PDP) — Most Critical Page
Mobile order:
1. Image gallery (swipe, zoom, optional video)
2. Title, brand, rating, SKU
3. **Price block:** Final price (bold), old price, saving amount, "Advance: ৳xxx" shown clearly
4. **Variant selector:** Color / Storage etc. (price update real time)
5. **Pre-Order info box:** ETA, shipment batch, advance %, refund info (icons)
6. Quantity + **Primary CTA: "Order on WhatsApp"** (green), secondary: "Add to Order List"
7. Sticky bottom bar (mobile): price + WhatsApp button
8. Trust badges mini row
9. Tabs/accordion: Description | Specifications | Shipping & Returns | Reviews | FAQ
10. "Customers also bought" / Similar products
11. Recently viewed (localStorage)

**Price transparency block (very important):**
```
Product price      ৳1,600
Shipping & customs ৳  250
-----------------------
Total (all included) ৳1,850
```

### 6.6 Cart / Order List Page
- Item list, qty edit, remove
- Subtotal, estimated advance
- Customer info (Name, phone, address, district) — optional, saved to localStorage
- **"Send Order on WhatsApp"** → generates full formatted message with all items.
- Note: "Eta order confirm noy, amader team confirm korbe."

### 6.7 Request a Product Page
- Form: Product name / link (AliExpress/1688/Taobao/Amazon), photo upload not possible (frontend only) → "WhatsApp e photo pathan", quantity, budget, notes.
- Submit → WhatsApp message pre-filled.

### 6.8 How Pre-Order Works / Policy Pages
Visual timeline, icons, short text, FAQ, clear refund conditions.

### 6.9 Reviews / Customer Stories
Photo grid, WhatsApp chat screenshots (customer permission), delivery proof.

---

## 7. WhatsApp Order Flow (Core Feature)

### 7.1 Link Format
```
https://wa.me/8801XXXXXXXXX?text=<URL-encoded message>
```
JS:
```js
const phone = "8801XXXXXXXXX";
const msg = `Assalamu Alaikum 👋
Ami ei product ta pre-order korte chai:

📦 Product: ${p.name}
🎨 Variant: ${variant}
🔢 Quantity: ${qty}
💰 Price: ৳${price}
🔗 Link: ${location.href}

Please confirm price, advance ar delivery time.`;
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
```

### 7.2 Cart Message Template (multi item)
```
Order List:
1) Product A — Black — x1 — ৳1,850
2) Product B — 128GB — x2 — ৳3,200
Total (estimated): ৳5,050
Name: ...   Phone: ...   Address: ...
```

### 7.3 Sales Script (Internal Team Guide — not on website)
1. Greeting + product confirm
2. Price, ETA, advance confirm
3. Objection handle (original? refund? customs?)
4. Payment instruction (bKash/Nagad number)
5. Order confirm message with Order ID
6. Status updates at 4 milestones
7. Delivery confirm + review request

### 7.4 Limitation (Honest Note)
Frontend-only website e **order automatically save hoy na**. Order record rakhar jonno suggest:
- Google Sheet e manually/Google Forms backup, ba
- WhatsApp Business app: labels (New, Advance Paid, Ordered, Shipped, Delivered), catalog, quick replies, away message.

---

## 8. Technology Stack (Frontend Only)

| Purpose | Choice |
|---|---|
| Structure | HTML5 semantic |
| Styling | CSS3 + **Bootstrap 5.3** (grid, offcanvas, modal, accordion, carousel) + custom CSS variables |
| Logic | Vanilla JavaScript (ES6 modules) |
| Data | **JSON files** (fetch API) |
| Search | **Fuse.js** (fuzzy search, Banglish spelling mistake handle kore) |
| Sliders | Swiper.js (touch friendly) |
| Icons | Bootstrap Icons / Font Awesome |
| Fonts | **Hind Siliguri** (Bangla) + **Inter** (English) |
| Cart/Wishlist | localStorage |
| Hosting | Netlify / Cloudflare Pages / GitHub Pages (free, HTTPS, CDN) |
| Analytics | Google Analytics 4 + Meta Pixel (event: WhatsApp click) |
| Images | WebP format, lazy loading, responsive `srcset` |

**Important dev note:** JSON `fetch()` local file (`file://`) e kaj kore na. Local testing e **VS Code Live Server** use korte hobe.

**Multi-page vs SPA:** SEO er jonno **multi-page** (index.html, shop.html, product.html?id=…, cart.html). Product page ek template file e URL query diye JSON theke load hobe. Phase 2 e static page generation (build script) korle SEO aro bhalo hobe.

---

## 9. JSON Data Architecture

Rule: **Prottek data type er alada file**, small file, easy edit. Non-technical team member ao Google Sheet → JSON convert kore update korte parbe.

### 9.1 Folder Structure
```
/project-root
├── index.html
├── shop.html
├── product.html
├── cart.html
├── request.html
├── how-it-works.html
├── about.html
├── contact.html
├── policy/
│   ├── pre-order.html
│   ├── refund.html
│   ├── shipping.html
│   └── privacy.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── js/
│   │   ├── config.js          (WhatsApp number, currency, constants)
│   │   ├── dataService.js     (fetch + cache JSON)
│   │   ├── render.js          (product card, sections)
│   │   ├── filters.js
│   │   ├── search.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   ├── whatsapp.js
│   │   └── main.js
│   ├── img/
│   │   ├── products/<product-id>/1.webp
│   │   ├── categories/
│   │   ├── brands/
│   │   └── ui/
│   └── fonts/
├── data/
│   ├── settings.json
│   ├── categories.json
│   ├── brands.json
│   ├── offers.json
│   ├── reviews.json
│   ├── faqs.json
│   ├── testimonials.json
│   ├── shipments.json
│   ├── pages/home.json        (hero slides, section order)
│   └── products/
│       ├── index.json         (lightweight list for search & listing)
│       ├── mobile-accessories.json
│       ├── audio.json
│       ├── smart-watch.json
│       ├── pc-parts.json
│       └── ...
└── README.md
```

### 9.2 `settings.json`
```json
{
  "storeName": "BrandName",
  "tagline": "China theke direct, tomar ghore",
  "whatsapp": "8801XXXXXXXXX",
  "currency": "৳",
  "advancePercent": 40,
  "defaultEtaDays": [12, 20],
  "usdToBdt": 125,
  "payment": ["bKash", "Nagad", "Bank Transfer"],
  "social": { "facebook": "", "instagram": "", "youtube": "" },
  "announcement": "Next China shipment: 25 Oct. Order before 20 Oct."
}
```

### 9.3 `categories.json`
```json
[
  {
    "id": "audio",
    "name": "Audio",
    "nameBn": "অডিও",
    "icon": "assets/img/categories/audio.webp",
    "slug": "audio",
    "order": 2,
    "featured": true,
    "subcategories": [
      { "id": "earbuds", "name": "Earbuds" },
      { "id": "headphones", "name": "Headphones" },
      { "id": "speakers", "name": "Speakers" }
    ]
  }
]
```

### 9.4 `products/<category>.json` — Product Schema
```json
{
  "id": "aud-0001",
  "slug": "brand-model-wireless-earbuds",
  "name": "Brand Model Wireless Earbuds",
  "brand": "brand-id",
  "category": "audio",
  "subcategory": "earbuds",
  "tags": ["bluetooth", "anc", "gaming"],
  "price": {
    "base": 1600,
    "shippingCustoms": 250,
    "final": 1850,
    "market": 2300,
    "currency": "BDT"
  },
  "preorder": {
    "type": "preorder",
    "etaDays": [12, 18],
    "advancePercent": 40,
    "batch": "ship-2026-10-25",
    "slotsLeft": null
  },
  "variants": [
    { "id": "black", "label": "Black", "priceDiff": 0, "image": "1.webp" },
    { "id": "white", "label": "White", "priceDiff": 50, "image": "2.webp" }
  ],
  "images": ["1.webp", "2.webp", "3.webp"],
  "video": "",
  "short": "ANC, 30h battery, Bluetooth 5.3",
  "description": "Full description here...",
  "specs": {
    "Battery": "30 hours",
    "Bluetooth": "5.3",
    "Warranty": "Pre-order: replacement guarantee"
  },
  "highlights": ["Active Noise Cancelling", "Fast charging"],
  "rating": 4.6,
  "reviewCount": 24,
  "badges": ["Pre-Order", "Hot"],
  "featured": true,
  "new": true,
  "status": "active",
  "createdAt": "2026-10-10",
  "seo": { "title": "", "description": "" }
}
```
**Pricing rule:** `final = (China price × usdToBdt/CNY rate) + shipping + customs + margin`. Excel/Sheet e formula rakhe JSON generate korle mistake kom hoy.

### 9.5 `products/index.json` (Lightweight)
Shudhu `id, name, slug, category, price.final, image, rating, badges` — search ar home page er jonno fast load. Full detail PDP te load hobe.

### 9.6 Others
- `offers.json`: `{id, title, products[], start, end, discountPercent, banner}`
- `reviews.json`: `{productId, name, rating, text, date, verified, photos[]}`
- `faqs.json`: `{group, q, a}`
- `shipments.json`: `{batchId, orderCutoff, shipDate, arrivalEstimate, status}` → announcement bar ar PDP "next batch" auto generate.
- `pages/home.json`: hero slides, section order, featured IDs → code change charai home page manage kora jabe.

### 9.7 Data Handling Best Practice
- Single `dataService.js` e fetch + in-memory cache + localStorage cache (version key diye).
- Sob JSON e `version` ba `updatedAt` field.
- ID consistent: `catPrefix-0001`.
- Image naming = product id based.
- JSON validate korar jonno chhoto script/online validator.

---

## 10. UI/UX Design System

### 10.1 Brand Identity
- **Tone:** Trustworthy, modern, helpful, tech-smart.
- **Name ideas (check availability):** TechBridge BD, ChinaTech Mart, Gadget Ghor, Pre-Tech BD, Techora, DragonKart.
- **Tagline ideas:** "China theke direct, tomar ghore" / "Original Tech, Smart Price".

### 10.2 Color Palette (Suggested)
| Role | Color | Use |
|---|---|---|
| Primary | `#0B1F3A` Deep Navy | Header, trust, headings |
| Accent | `#FF6B1A` Energetic Orange | Price highlight, badges, offers |
| CTA (WhatsApp) | `#25D366` Green | Order buttons (people already recognise it) |
| Background | `#F6F8FB` | Page background |
| Surface | `#FFFFFF` | Cards |
| Text | `#1B2430` / muted `#6B7686` | Content |
| Success/Warning/Error | `#16A34A` / `#F59E0B` / `#DC2626` | Status |

Psychology: Navy = trust/authority, Orange = energy/urgency (sparingly), Green = "go/safe action".
Contrast ratio WCAG AA maintain korte hobe.

### 10.3 Typography
- Bangla: **Hind Siliguri**; English: **Inter**.
- Mobile base 15–16px, line height 1.5, price 18–20px bold.
- H1 24–28px (mobile), 36–44px (desktop).

### 10.4 Spacing & Shape
- 8px spacing scale, card radius 12px, button radius 10px, soft shadow.
- Tap target minimum **44×44px**.

### 10.5 Key Components
Header, mega-menu, bottom nav, product card, badge, price block, rating, variant chip, quantity stepper, filter offcanvas, accordion, toast ("Added to list ✔"), skeleton loader, empty state, modal (quick view), floating WhatsApp, announcement bar, breadcrumb, review card, step timeline.

### 10.6 Breakpoints (Bootstrap)
`<576` mobile (design first) → `≥576` → `≥768` tablet → `≥992` laptop → `≥1200` desktop.
Grid: 2 / 2 / 3 / 4 / 4-5 columns.

### 10.7 Micro-interactions
Button press feedback, heart animation, skeleton loading, smooth scroll, image zoom — subtle, 150–250ms. Animation overdo korle slow feel hoy.

### 10.8 Mobile UX Rules
- Thumb-zone friendly: main CTA niche.
- Sticky bottom price + WhatsApp bar on PDP.
- Offcanvas filter (full height).
- Short forms, `inputmode="tel"` for phone.
- Compress images, 2G/3G friendly (lazy load, WebP, minimal JS).

---

## 11. Trust Building Checklist (Pre-order er Heart)
- [ ] Real address, phone, business hours, social links.
- [ ] Trade license / business registration info (jodi thake).
- [ ] "How it works" 4-step visual.
- [ ] Clear advance % ar refund condition.
- [ ] Real order photos, unboxing, delivery proof.
- [ ] Reviews with real name/photo (permission niye).
- [ ] Price breakdown (no hidden charge).
- [ ] ETA per product, shipment batch calendar.
- [ ] Order tracking milestone message.
- [ ] Facebook page link + customer group.
- [ ] Original product guarantee statement + proof method.

---

## 12. SEO, Performance, Accessibility

**SEO:** Unique title/meta per page, clean URLs, `Product` + `BreadcrumbList` + `Organization` JSON-LD schema, sitemap.xml, robots.txt, Open Graph tags (WhatsApp/Facebook share preview important!), alt text, Bangla + English keywords.
**Performance:** Lighthouse mobile score 85+, lazy load, WebP, minify CSS/JS, preconnect fonts, defer scripts, cache JSON.
**Accessibility:** Semantic HTML, alt text, focus states, ARIA for modals/accordion, contrast, keyboard navigable.
**Security (frontend):** HTTPS, no sensitive data store, sanitize any text injected in DOM from JSON (`textContent` prefer).

---

## 13. Analytics & Conversion Tracking
Track events: `view_item`, `add_to_list`, `whatsapp_click` (with product id), `search`, `filter_use`, `request_product_submit`.
KPIs: Visitor → WhatsApp click rate, WhatsApp click → confirmed order, avg order value, repeat customer %, top searched keyword (kon product chay).

---

## 14. Development Roadmap

| Phase | Work | Output |
|---|---|---|
| 1 — Foundation (Week 1) | Brand, color, font, folder structure, JSON schema, base CSS, header/footer, config | Skeleton ready |
| 2 — Core Pages (Week 2) | Home, Shop listing, filter/sort/search, product card | Browse working |
| 3 — Conversion (Week 3) | PDP, variants, WhatsApp order, cart/wishlist, request-product page | Orders can start |
| 4 — Trust & Content (Week 4) | How it works, policies, reviews, FAQ, About, Contact | Credible brand |
| 5 — Polish (Week 5) | SEO, performance, analytics, accessibility, cross-device testing | Launch ready |
| 6 — Growth (After launch) | Compare, blog, Bangla/English toggle, offers engine, Google Sheet → JSON workflow, PWA | Scale |

**Testing devices:** Low-end Android (360px), iPhone, tablet, desktop; Chrome, Safari, Samsung Internet.

---

## 15. Risks & Smart Improvements
| Risk | Solution |
|---|---|
| Order record hariye jawa (no backend) | WhatsApp Business labels + Google Sheet backup |
| Price/exchange rate change | `usdToBdt` ekta jaygay (settings.json) + price update script |
| Fake trust claims | Only real reviews/numbers use korbo |
| Customs/delay | Honest ETA range + proactive update |
| JSON manual edit mistake | Google Sheet → JSON converter, JSON validator |
| Site slow on mobile | Image optimization, lazy load, small JS |
| Later backend lagle | JSON structure ta database-ready rakha (consistent IDs) |

---

## 16. Decisions Needed From You (To Finalize)
1. Brand name & logo ache kina?
2. Advance payment koto % rakhben?
3. Delivery area: whole Bangladesh naki selected district?
4. COD (arrival e payment) allow korben?
5. Initial product category gulo ki ki? Prothom batch e koyta product?
6. Warranty / replacement policy ki dite parben?
7. Bangla-only, English-only, naki mixed (recommended: mixed with toggle later)?
8. WhatsApp number ar Facebook page ready ache?

---

## 17. Final Summary
**Concept:** *Catalog-first website with WhatsApp-first conversion*, trust-heavy design, mobile-first, data-driven by modular JSON files.
**Core promise:** "Original tech, clear price, clear delivery time, easy chat order."
**Next step:** Ei outline approve hole ami Phase 1 theke code start korte pari (folder structure, JSON sample data, home page + product card + WhatsApp order function).
