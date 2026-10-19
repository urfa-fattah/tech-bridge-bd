/**
 * Smart Landed Cost Calculator for Chinese Imports
 * TechBridge BD
 */

import { APP_CONFIG } from './config.js';

export const SmartCalculator = {
  calculate({ price, currency = 'USD', weightKg = 0.3, category = 'standard' }) {
    const rawPrice = parseFloat(price) || 0;
    const weight = parseFloat(weightKg) || 0.3;

    if (rawPrice <= 0) {
      return {
        itemCostBDT: 0,
        shippingBDT: 0,
        customsBDT: 0,
        totalBDT: 0,
        advanceBDT: 0,
        remainingBDT: 0
      };
    }

    // Currency conversion
    const rate = currency === 'CNY' ? APP_CONFIG.cnyToBdt : APP_CONFIG.usdToBdt;
    const itemCostBDT = Math.round(rawPrice * rate);

    // Air Freight calculation (Minimum weight charge = 0.25 kg)
    const effectiveWeight = Math.max(weight, 0.25);
    const shippingBDT = Math.round(effectiveWeight * APP_CONFIG.airFreightPerKg);

    // Customs clearance & processing (flat transparent 8-10% depending on tier)
    const customsRate = category === 'heavy_pc' ? 0.12 : 0.08;
    const customsBDT = Math.round(itemCostBDT * customsRate);

    // Final Landed Cost
    const totalBDT = itemCostBDT + shippingBDT + customsBDT;
    const advanceBDT = Math.round(totalBDT * (APP_CONFIG.advancePercent / 100));
    const remainingBDT = totalBDT - advanceBDT;

    return {
      rawPrice,
      currency,
      rate,
      weight: effectiveWeight,
      itemCostBDT,
      shippingBDT,
      customsBDT,
      totalBDT,
      advanceBDT,
      remainingBDT
    };
  }
};
