/**
 * Catalog Filter & Sort Engine
 * TechBridge BD
 */

const SEARCH_SYNONYMS = {
  'erbuds': 'earbuds',
  'earbud': 'earbuds',
  'airpod': 'earbuds',
  'airpods': 'earbuds',
  'tws': 'audio',
  'headphone': 'audio',
  'sound': 'audio',
  'gan': 'power',
  'charger': 'power',
  'smartwatch': 'smart-watch',
  'ghori': 'smart-watch',
  'watch': 'smart-watch',
  'mowse': 'mouse',
  'mice': 'mouse',
  'keybord': 'keyboard',
  'keycap': 'keyboard',
  'cooler': 'pc-parts',
  'ssd': 'pc-parts',
  'nvme': 'pc-parts'
};

export const FilterService = {
  applyFilters(products, options = {}) {
    let result = [...products];

    // 1. Category Filter
    if (options.category && options.category !== 'all') {
      result = result.filter(p => p.category === options.category);
    }

    // 2. Subcategory Filter
    if (options.subcategory) {
      result = result.filter(p => p.subcategory === options.subcategory);
    }

    // 3. Brand Filter
    if (options.brands && options.brands.length > 0) {
      result = result.filter(p => options.brands.includes(p.brand));
    }

    // 4. Price Range Filter
    if (options.minPrice !== undefined && options.minPrice !== null && options.minPrice !== '') {
      result = result.filter(p => p.price.final >= Number(options.minPrice));
    }
    if (options.maxPrice !== undefined && options.maxPrice !== null && options.maxPrice !== '') {
      result = result.filter(p => p.price.final <= Number(options.maxPrice));
    }

    // 5. Search keyword with comprehensive matching & synonym expansion
    if (options.search && options.search.trim()) {
      let q = options.search.toLowerCase().trim();
      let synonymTarget = SEARCH_SYNONYMS[q] || null;

      result = result.filter(p => {
        const nameMatch = p.name && p.name.toLowerCase().includes(q);
        const nameBnMatch = p.nameBn && p.nameBn.toLowerCase().includes(q);
        const brandMatch = p.brand && p.brand.toLowerCase().includes(q);
        const catMatch = p.category && p.category.toLowerCase().includes(q);
        const subCatMatch = p.subcategory && p.subcategory.toLowerCase().includes(q);
        const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));

        let synMatch = false;
        if (synonymTarget) {
          synMatch = (p.category && p.category.toLowerCase().includes(synonymTarget)) ||
                     (p.subcategory && p.subcategory.toLowerCase().includes(synonymTarget)) ||
                     (p.tags && p.tags.some(t => t.toLowerCase().includes(synonymTarget)));
        }

        return nameMatch || nameBnMatch || brandMatch || catMatch || subCatMatch || tagMatch || synMatch;
      });
    }

    // 6. Sorting
    switch (options.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price.final - b.price.final);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price.final - a.price.final);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default: // featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }
};
