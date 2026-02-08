import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productsCents = 0;
  let shippingCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    productsCents += product.priceCents * cartItem.quantity;

    shippingCents += getDeliveryOption(cartItem.deliveryOptionId).priceCents;
  });
  const totalBeforeTaxCents = productsCents + shippingCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHTML = `
          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">${formatCurrency(productsCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
          </div>

  `;
  document.querySelector(".payment-summary-title").innerHTML =
    paymentSummaryHTML;
}
