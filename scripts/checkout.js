import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

new Promise(() => {
    loadProductsFetch().then(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
