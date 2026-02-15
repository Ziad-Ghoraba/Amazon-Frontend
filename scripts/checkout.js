import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

async function loadPage() {
    console.log("Loading page...");
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
    return 'value2';
}

loadPage().then((value) => {
    console.log("Page loaded.");
    console.log(value);
});

console.log("Before loading page...");
// async function loadPage() {
//     return new Promise((resolve) => {
//         console.log("Page loaded.");
//         resolve();
//     })
// };


// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
