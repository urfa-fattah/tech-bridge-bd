/**
 * WhatsApp Order & Request Message Formatter
 * TechBridge BD
 */

import { APP_CONFIG, formatCurrency } from './config.js';

export const WhatsAppService = {
  /**
   * Generates wa.me link with URL-encoded text
   */
  createLink(message) {
    const phone = APP_CONFIG.whatsappNumber;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Open WhatsApp in new tab or trigger application
   */
  openChat(message) {
    const url = this.createLink(message);
    window.open(url, '_blank');
  },

  /**
   * Copy message to clipboard as fallback
   */
  async copyMessage(message) {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Single Product Pre-Order
   */
  orderProduct({ product, variant = "Standard", quantity = 1, currentUrl = window.location.href }) {
    const unitPrice = product.price.final;
    const totalPrice = unitPrice * quantity;
    const advance = Math.round(totalPrice * (APP_CONFIG.advancePercent / 100));
    const etaText = product.preorder?.etaDays 
      ? `${product.preorder.etaDays[0]}–${product.preorder.etaDays[1]} days` 
      : "12–18 days";

    const msg = `Assalamu Alaikum 👋
Ami TechBridge BD theke ei product ta pre-order korte chai:

📦 Product: ${product.name}
🎨 Variant: ${variant}
🔢 Quantity: ${quantity}
💰 Total Price: ${formatCurrency(totalPrice)}
💳 Estimated 40% Advance: ${formatCurrency(advance)}
⏱️ Delivery ETA: ${etaText}
✈️ Batch: ${product.preorder?.batch || 'Next China Air Flight'}
🔗 Link: ${currentUrl}

Please confirm payment procedure & delivery date.`;

    this.openChat(msg);
  },

  /**
   * Multi-item Cart Pre-Order
   */
  orderCart({ items, customer = {}, total, advance }) {
    if (!items || items.length === 0) return;

    let itemsListText = items.map((item, index) => {
      const lineTotal = item.price * item.quantity;
      return `${index + 1}) ${item.name} (${item.variant || 'Standard'}) — x${item.quantity} — ${formatCurrency(lineTotal)}`;
    }).join('\n');

    const customerText = customer.name 
      ? `\n👤 Name: ${customer.name}\n📞 Phone: ${customer.phone || 'N/A'}\n📍 Address: ${customer.address || ''}, ${customer.district || 'Dhaka'}`
      : '\n(Customer details to be confirmed in chat)';

    const msg = `Assalamu Alaikum 👋
Ami TechBridge BD theke ei cart list ta pre-order korte chai:

📋 Order Items:
${itemsListText}

----------------------------
💰 Total Estimated: ${formatCurrency(total)}
💳 40% Advance Payable: ${formatCurrency(advance)}
💵 Remaining on BD Delivery: ${formatCurrency(total - advance)}
----------------------------
${customerText}

Please confirm my order and share bKash/Nagad payment number.`;

    this.openChat(msg);
  },

  /**
   * Custom Product Request (from AliExpress, 1688, Taobao, etc.)
   */
  requestCustomProduct({ productName, link = "", budget = "", notes = "", estimatedLanded = null }) {
    let calcNote = "";
    if (estimatedLanded) {
      calcNote = `\n🧮 Calculator Estimated: ${formatCurrency(estimatedLanded.total)} (Advance: ${formatCurrency(estimatedLanded.advance)})`;
    }

    const msg = `Assalamu Alaikum 👋
Ami China theke ekta custom product import korte chai:

📦 Product Name/Model: ${productName}
🔗 China Link: ${link || 'Link nai, model name dilam'}
💵 My Budget: ${budget ? `৳${budget}` : 'Sera quotation din'}
📝 Additional Notes: ${notes || 'Original sealed pack chai'}
${calcNote}

Doyakore check kore final price ar delivery time bolben?`;

    this.openChat(msg);
  },

  /**
   * General inquiry
   */
  generalInquiry(topic = "China Pre-Order Information") {
    const msg = `Assalamu Alaikum 👋
Ami TechBridge BD er China pre-order service niye kotha bolte chai (${topic}).`;
    this.openChat(msg);
  }
};
