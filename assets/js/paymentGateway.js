/**
 * Payment Gateway Engine (Demo Sandbox & Real API Ready)
 * TechBridge BD — China Pre-Order Platform
 * 
 * Features:
 * - 40% Advance Pre-Order Calculation & 60% On-Delivery Verification
 * - Built-in Demo Sandbox for bKash, Nagad, SSLCOMMERZ (Cards/NetBanking), and Cash on Delivery
 * - Easy plug-and-play architecture to hook into real payment APIs
 * - Integrated WhatsApp Order & Receipt sync (Helpline: 01933407672)
 */

import { APP_CONFIG, formatCurrency } from './config.js';
import { WhatsAppService } from './whatsapp.js';
import { CartService } from './cart.js';
import { RenderService } from './render.js';

export const PAYMENT_CONFIG = {
  // Set isDemo to false when deploying live merchant credentials
  isDemo: true,
  advancePercent: 40,
  currency: "BDT",
  
  // Real API Endpoints & Configuration Slots
  providers: {
    bkash: {
      id: "bkash",
      name: "bKash Checkout",
      shortName: "bKash",
      icon: "bi-phone-fill",
      color: "#E2136E",
      badge: "Instant 40% Advance",
      description: "Direct bKash Merchant Payment (PIN/OTP)",
      // Production API slots:
      createPaymentUrl: "/api/payment/bkash/create",
      executePaymentUrl: "/api/payment/bkash/execute",
      merchantNumber: "01933407672"
    },
    nagad: {
      id: "nagad",
      name: "Nagad Checkout",
      shortName: "Nagad",
      icon: "bi-lightning-charge-fill",
      color: "#F7941D",
      badge: "Digital Wallet",
      description: "Fast Payment via Nagad Merchant Wallet",
      // Production API slots:
      initiatePaymentUrl: "/api/payment/nagad/initialize",
      merchantNumber: "01933407672"
    },
    sslcommerz: {
      id: "sslcommerz",
      name: "Debit / Credit Card & Internet Banking",
      shortName: "Cards / SSL",
      icon: "bi-credit-card-2-front-fill",
      color: "#1A56DB",
      badge: "Visa / Mastercard / Amex",
      description: "Secure 256-bit SSLCOMMERZ Payment Gateway",
      // Production API slots:
      sessionInitUrl: "/api/payment/sslcommerz/init",
      storeId: "techbridge_live"
    },
    cod: {
      id: "cod",
      name: "Office / Courier Balance Settlement",
      shortName: "Remaining 60% COD",
      icon: "bi-box-seam-fill",
      color: "#10B981",
      badge: "On Delivery Verification",
      description: "Pay remaining 60% after opening package in Dhaka / Hub",
      note: "Only applicable for remaining balance after advance confirmation"
    }
  }
};

export class PaymentGateway {
  /**
   * Launch Checkout Modal
   * @param {Object} options
   * @param {Array} options.items - Cart items
   * @param {Number} options.totalAmount - Grand total in BDT
   * @param {Object} [options.customer] - Customer details { name, phone, address }
   * @param {Function} [options.onSuccess] - Callback on payment completion
   */
  static openCheckoutModal(options = {}) {
    const items = options.items || CartService.getItems();
    if (!items || items.length === 0) {
      RenderService.showToast('Your order list is empty!', 'bi-cart-x');
      return;
    }

    const totalAmount = options.totalAmount || CartService.getTotal();
    const advanceAmount = Math.round(totalAmount * (PAYMENT_CONFIG.advancePercent / 100));
    const dueAmount = totalAmount - advanceAmount;
    const customer = options.customer || {
      name: document.getElementById('checkoutName')?.value || '',
      phone: document.getElementById('checkoutPhone')?.value || '',
      address: document.getElementById('checkoutAddress')?.value || '',
      note: document.getElementById('checkoutNote')?.value || ''
    };

    // Remove any existing modal
    const existing = document.getElementById('techbridgePaymentModal');
    if (existing) existing.remove();

    // Create Modal DOM
    const modalWrap = document.createElement('div');
    modalWrap.id = 'techbridgePaymentModal';
    modalWrap.className = 'pg-backdrop';
    
    modalWrap.innerHTML = `
      <div class="pg-modal-card" role="dialog" aria-modal="true">
        <!-- Header -->
        <div class="pg-header">
          <div class="pg-brand-row">
            <div class="pg-brand-icon">
              <i class="bi bi-shield-lock-fill"></i>
            </div>
            <div>
              <h3 class="pg-title">TechBridge Secure Checkout</h3>
              <span class="pg-subtitle">China Direct Pre-Order Gateway</span>
            </div>
          </div>
          <button class="pg-close-btn" id="pgCloseBtn" aria-label="Close modal">&times;</button>
        </div>

        <!-- Body -->
        <div class="pg-body" id="pgModalBody">
          <!-- Demo Mode Badge -->
          ${PAYMENT_CONFIG.isDemo ? `
            <div class="pg-sandbox-badge">
              <i class="bi bi-info-circle-fill"></i>
              <span><strong>DEMO PAYMENT GATEWAY (SANDBOX ACTIVE)</strong> — Ready for API Connection</span>
            </div>
          ` : ''}

          <!-- Order Summary -->
          <div class="pg-summary-box">
            <div class="pg-summary-row">
              <span class="text-muted">Total Order Value:</span>
              <strong>${formatCurrency(totalAmount)}</strong>
            </div>
            <div class="pg-summary-row">
              <span class="text-primary fw-bold">Required Pre-Order Advance (40%):</span>
              <strong class="text-accent fs-6">${formatCurrency(advanceAmount)}</strong>
            </div>
            <div class="pg-summary-row">
              <span class="text-muted small">Due Upon Delivery (60%):</span>
              <span class="text-muted small">${formatCurrency(dueAmount)}</span>
            </div>
          </div>

          <!-- Step 1: Provider Selection -->
          <div id="pgStep1">
            <label class="pg-form-label mb-2">Select Payment Method (for 40% Advance):</label>
            <div class="pg-method-grid">
              <!-- bKash -->
              <div class="pg-method-card bkash active" data-provider="bkash">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="method-icon-box">
                    <i class="bi bi-phone-fill"></i>
                  </div>
                  <span class="badge bg-danger bg-opacity-10 text-danger small">40% Advance</span>
                </div>
                <span class="pg-method-name">bKash Merchant</span>
                <span class="pg-method-desc">Instant online gateway</span>
              </div>

              <!-- Nagad -->
              <div class="pg-method-card nagad" data-provider="nagad">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="method-icon-box">
                    <i class="bi bi-lightning-charge-fill"></i>
                  </div>
                  <span class="badge bg-warning bg-opacity-10 text-warning-emphasis small">Instant</span>
                </div>
                <span class="pg-method-name">Nagad Checkout</span>
                <span class="pg-method-desc">Digital wallet payment</span>
              </div>

              <!-- SSLCOMMERZ -->
              <div class="pg-method-card ssl" data-provider="sslcommerz">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="method-icon-box">
                    <i class="bi bi-credit-card-2-front-fill"></i>
                  </div>
                  <span class="badge bg-primary bg-opacity-10 text-primary small">Cards / Bank</span>
                </div>
                <span class="pg-method-name">Visa / Master / Amex</span>
                <span class="pg-method-desc">SSLCOMMERZ secure gateway</span>
              </div>

              <!-- Remaining Balance -->
              <div class="pg-method-card cod" data-provider="cod">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="method-icon-box">
                    <i class="bi bi-box-seam-fill"></i>
                  </div>
                  <span class="badge bg-success bg-opacity-10 text-success small">60% Balance</span>
                </div>
                <span class="pg-method-name">Cash on Delivery</span>
                <span class="pg-method-desc">Remaining 60% on delivery</span>
              </div>
            </div>

            <!-- Customer Phone Input -->
            <div class="pg-form-group">
              <label class="pg-form-label" for="pgCustomerPhone">Your bKash / Payment Mobile Number:</label>
              <input type="tel" id="pgCustomerPhone" class="pg-input" placeholder="017xxxxxxxx or 019xxxxxxxx" value="${customer.phone || ''}">
              <div class="pg-test-tip">
                <i class="bi bi-shield-check text-success"></i> Sandbox Demo: Enter any valid 11-digit Bangladeshi mobile number.
              </div>
            </div>

            <div class="pg-actions">
              <button type="button" class="pg-btn-cancel" id="pgCancelBtn">Cancel</button>
              <button type="button" class="pg-btn-submit" id="pgProceedBtn">
                <span>Proceed to Pay ${formatCurrency(advanceAmount)}</span>
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Step 2: Simulated OTP / PIN (Demo Sandbox) -->
          <div id="pgStep2" style="display: none;">
            <div class="text-center mb-3">
              <div class="badge bg-secondary-subtle text-secondary-emphasis p-2 mb-2">
                <i class="bi bi-lock-fill"></i> Secured Sandbox Verification
              </div>
              <h4 class="h5 fw-bold mb-1" id="pgStep2Title">bKash Sandbox Verification</h4>
              <p class="text-muted small mb-0">Simulating payment request for <strong class="text-accent">${formatCurrency(advanceAmount)}</strong></p>
            </div>

            <div class="pg-form-group">
              <label class="pg-form-label" for="pgOtpInput">Enter 6-Digit Sandbox OTP:</label>
              <input type="text" id="pgOtpInput" class="pg-input text-center fs-5 fw-bold letter-spacing-2" placeholder="123456" maxlength="6" value="123456">
              <div class="pg-test-tip text-center">
                <i class="bi bi-info-circle"></i> Demo Verification Code: <strong>123456</strong>
              </div>
            </div>

            <div class="pg-form-group">
              <label class="pg-form-label" for="pgPinInput">Enter 4-Digit Sandbox PIN:</label>
              <input type="password" id="pgPinInput" class="pg-input text-center fs-5 fw-bold" placeholder="••••" maxlength="5" value="1234">
              <div class="pg-test-tip text-center">
                <i class="bi bi-shield-lock"></i> Demo Sandbox PIN: <strong>1234</strong>
              </div>
            </div>

            <div class="pg-actions">
              <button type="button" class="pg-btn-cancel" id="pgBackToStep1">Back</button>
              <button type="button" class="pg-btn-submit" id="pgConfirmPayBtn">
                <span id="pgPayBtnText">Confirm Demo Payment</span>
                <i class="bi bi-check-circle-fill"></i>
              </button>
            </div>
          </div>

          <!-- Step 3: Success Screen & Receipt -->
          <div id="pgStep3" style="display: none;">
            <div class="pg-receipt-card">
              <div class="pg-receipt-icon">
                <i class="bi bi-check2-circle"></i>
              </div>
              <h4 class="h5 fw-bold text-success mb-1">Pre-Order Advance Received!</h4>
              <p class="text-muted small mb-2">Demo Payment Gateway Transaction Successful</p>
              
              <div class="pg-trx-pill" id="pgReceiptTrx">
                TRX-TB-998877
              </div>

              <div class="pg-summary-box text-start mb-3">
                <div class="pg-summary-row">
                  <span class="text-muted">Total Order:</span>
                  <strong>${formatCurrency(totalAmount)}</strong>
                </div>
                <div class="pg-summary-row">
                  <span class="text-success fw-bold">40% Advance Paid:</span>
                  <strong class="text-success">${formatCurrency(advanceAmount)}</strong>
                </div>
                <div class="pg-summary-row">
                  <span class="text-warning-emphasis fw-bold">Due on Delivery (60%):</span>
                  <strong>${formatCurrency(dueAmount)}</strong>
                </div>
                <div class="pg-summary-row">
                  <span class="text-muted">Payment Provider:</span>
                  <span id="pgReceiptProvider">bKash (Demo Sandbox)</span>
                </div>
                <div class="pg-summary-row">
                  <span class="text-muted">Direct Helpline:</span>
                  <span>+880 1933-407672</span>
                </div>
              </div>

              <p class="small text-muted mb-3">
                Click below to send this confirmed transaction and product list directly to our WhatsApp operations team for instant flight booking.
              </p>

              <button type="button" class="btn btn-whatsapp w-100 py-3 rounded-pill fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow" id="pgWhatsappSyncBtn">
                <i class="bi bi-whatsapp fs-5"></i>
                <span>Confirm Order on WhatsApp</span>
              </button>

              <button type="button" class="btn btn-link text-muted btn-sm mt-3" id="pgFinishBtn">
                Close & Return to Store
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalWrap);

    // Wire Interactive Listeners
    let selectedProvider = "bkash";
    let generatedTrxId = "";

    // Close logic
    const close = () => {
      modalWrap.remove();
      if (options.onCancel) options.onCancel();
    };

    modalWrap.querySelector('#pgCloseBtn').addEventListener('click', close);
    modalWrap.querySelector('#pgCancelBtn').addEventListener('click', close);
    modalWrap.addEventListener('click', (e) => {
      if (e.target === modalWrap) close();
    });

    // Provider Card Selection
    const methodCards = modalWrap.querySelectorAll('.pg-method-card');
    methodCards.forEach(card => {
      card.addEventListener('click', () => {
        methodCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedProvider = card.dataset.provider;

        // If COD selected for entire advance
        const proceedBtnText = modalWrap.querySelector('#pgProceedBtn span');
        if (selectedProvider === 'cod') {
          proceedBtnText.textContent = `Confirm Pre-Order with COD Balance`;
        } else {
          proceedBtnText.textContent = `Proceed to Pay ${formatCurrency(advanceAmount)}`;
        }
      });
    });

    // Step 1 -> Step 2
    modalWrap.querySelector('#pgProceedBtn').addEventListener('click', () => {
      const phoneInput = modalWrap.querySelector('#pgCustomerPhone');
      const phone = phoneInput.value.trim();
      if (!phone || phone.length < 10) {
        phoneInput.focus();
        RenderService.showToast('Please enter a valid mobile number!', 'bi-exclamation-triangle');
        return;
      }

      // If Production Mode is enabled, here is where live redirect or API happens
      if (!PAYMENT_CONFIG.isDemo) {
        PaymentGateway.executeProductionApi({
          provider: selectedProvider,
          amount: advanceAmount,
          customerPhone: phone,
          items
        });
        return;
      }

      // In Demo Mode, switch to Step 2
      const step1 = modalWrap.querySelector('#pgStep1');
      const step2 = modalWrap.querySelector('#pgStep2');
      const step2Title = modalWrap.querySelector('#pgStep2Title');
      
      const providerConfig = PAYMENT_CONFIG.providers[selectedProvider] || PAYMENT_CONFIG.providers.bkash;
      step2Title.textContent = `${providerConfig.name} Sandbox Verification`;

      step1.style.display = 'none';
      step2.style.display = 'block';
    });

    // Back to Step 1
    modalWrap.querySelector('#pgBackToStep1').addEventListener('click', () => {
      modalWrap.querySelector('#pgStep2').style.display = 'none';
      modalWrap.querySelector('#pgStep1').style.display = 'block';
    });

    // Confirm Payment (Step 2 -> Step 3)
    modalWrap.querySelector('#pgConfirmPayBtn').addEventListener('click', () => {
      const payBtn = modalWrap.querySelector('#pgConfirmPayBtn');
      const payBtnText = modalWrap.querySelector('#pgPayBtnText');
      
      payBtn.disabled = true;
      payBtnText.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing Demo Transaction...`;

      setTimeout(() => {
        generatedTrxId = `TRX-TB-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const step2 = modalWrap.querySelector('#pgStep2');
        const step3 = modalWrap.querySelector('#pgStep3');
        const receiptTrx = modalWrap.querySelector('#pgReceiptTrx');
        const receiptProvider = modalWrap.querySelector('#pgReceiptProvider');

        receiptTrx.textContent = generatedTrxId;
        receiptProvider.textContent = `${PAYMENT_CONFIG.providers[selectedProvider]?.name || 'bKash'} (Demo Sandbox)`;

        step2.style.display = 'none';
        step3.style.display = 'block';

        // Clear Cart upon successful order
        CartService.clearCart();

        if (options.onSuccess) {
          options.onSuccess({
            trxId: generatedTrxId,
            provider: selectedProvider,
            advanceAmount,
            dueAmount,
            totalAmount
          });
        }
      }, 1200);
    });

    // WhatsApp Direct Sync
    modalWrap.querySelector('#pgWhatsappSyncBtn').addEventListener('click', () => {
      const phone = modalWrap.querySelector('#pgCustomerPhone')?.value || customer.phone || 'N/A';
      const custName = customer.name || 'Valued TechBridge Customer';

      let message = `*TechBridge Pre-Order Advance Payment Confirmation*\n`;
      message += `-------------------------------------------\n`;
      message += `*Transaction ID:* ${generatedTrxId}\n`;
      message += `*Payment Method:* ${PAYMENT_CONFIG.providers[selectedProvider]?.name} (Advance Confirmed)\n`;
      message += `*Customer:* ${custName} (${phone})\n`;
      message += `*Total Order Value:* ${formatCurrency(totalAmount)}\n`;
      message += `*40% Advance Paid:* ${formatCurrency(advanceAmount)}\n`;
      message += `*60% Due on Delivery:* ${formatCurrency(dueAmount)}\n`;
      message += `-------------------------------------------\n`;
      message += `*Ordered Items:*\n`;

      items.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name} (${item.variant || 'Standard'}) x ${item.quantity || 1} = ${formatCurrency((item.price || 0) * (item.quantity || 1))}\n`;
      });

      message += `-------------------------------------------\n`;
      message += `Please confirm my flight shipment tracking batch!`;

      const waUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      close();
    });

    // Finish / Close button
    modalWrap.querySelector('#pgFinishBtn').addEventListener('click', () => {
      close();
      window.location.href = 'index.html';
    });
  }

  /**
   * Production API Connector Hook
   * Ready for real backend API integration (bKash / Nagad / SSLCOMMERZ)
   */
  static async executeProductionApi({ provider, amount, customerPhone, items }) {
    console.log(`[TechBridge PaymentGateway] Connecting to live ${provider} API...`, {
      amount,
      customerPhone,
      items
    });

    // Hook template for production integration:
    // try {
    //   const response = await fetch(`/api/payment/${provider}/initiate`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount, phone: customerPhone, items, returnUrl: window.location.href })
    //   });
    //   const data = await response.json();
    //   if (data.paymentUrl) {
    //     window.location.href = data.paymentUrl;
    //   }
    // } catch (err) {
    //   console.error("Payment API Error:", err);
    // }

    RenderService.showToast('Production API hook triggered. Configure endpoint in paymentGateway.js.', 'bi-gear-fill');
  }
}
