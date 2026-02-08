import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

function deliveryOptionHTML(matchingProductId, cartItem) {
  let deliveryOptionsHTML = "";
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today
      .add(option.deliveryDays, "day")
      .format("dddd, MMMM D");

    const isChecked = cart.some((cartItem) => {
      return (
        cartItem.id === matchingProductId &&
        cartItem.deliveryOptionId === option.id
      );
    });

    const price =
      option.priceCents === 0
        ? "FREE Shipping"
        : formatCurrency(option.priceCents) + " - Shipping";
    deliveryOptionsHTML += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProductId}" data-delivery-option-id="${option.id}">
                <input
                type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProductId}"
                />
                <div>
                <div class="delivery-option-date">${deliveryDate}</div>
                <div class="delivery-option-price">${price}</div>
                </div>
            </div>
            `;
  });
  return deliveryOptionsHTML;
}

export function renderOrderSummary() {
  let cartItemsHTML = "";
  cart.forEach((cartItem, index) => {
    const productId = cartItem.id;

    const matchingItem = getProduct(productId);

    if (!matchingItem) {
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    // Fallback to first delivery option if not found
    if (!deliveryOption) {
      deliveryOption = deliveryOptions[0];
    }

    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, "day")
      .format("dddd, MMMM D");

    cartItemsHTML += `          
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">Delivery date: ${deliveryDate}</div>

          <div class="cart-item-details-grid">
              <img
              class="product-image"
              src="${matchingItem.image}"
              />

              <div class="cart-item-details">
              <div class="product-name">
                  ${matchingItem.name}
              </div>
              <div class="product-price">${formatCurrency(matchingItem.priceCents)}</div>
              <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary">
                  Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItem.id}">
                  Delete
                  </span>
              </div>
              </div>

              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingItem.id, cartItem)}
          </div>
          </div>
      </div>`;
  });

  document.querySelector(".js-order-summary").innerHTML = cartItemsHTML;

  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
