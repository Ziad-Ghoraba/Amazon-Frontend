export let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].id === productId) {
      cart.splice(i, 1);
    }
  }
  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}
