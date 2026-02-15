import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productsCents = 0;
  let shippingCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (product) {
      productsCents += product.priceCents * cartItem.quantity;
    }

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (deliveryOption) {
      shippingCents += deliveryOption.priceCents;
    }
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

           <button class="place-order-button js-place-order button-primary">
            Place your order
          </button>

  `;
  const paymentSummaryContainer = document.querySelector(
    ".js-payment-summary-rows",
  );
  if (paymentSummaryContainer) {
    paymentSummaryContainer.innerHTML = paymentSummaryHTML;
  }

  document.querySelector(".js-place-order").addEventListener("click", async () => {
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      const orderDetails = await response.json();
      addOrder(orderDetails);
    }
    catch (error) {
      console.error("Error placing order:", error);
    }

    window.location.href = "orders.html";
  });
}


