function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromLocalStorage() {
      this.cartItems = localStorage.getItem(localStorageKey)
        ? JSON.parse(localStorage.getItem(localStorageKey))
        : [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
    },
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToLocalStorage();
    },
    removeFromCart(productId) {
      for (let i = this.cartItems.length - 1; i >= 0; i--) {
        if (this.cartItems[i].productId === productId) {
          this.cartItems.splice(i, 1);
        }
      }
      this.saveToLocalStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },
  };

  return cart;
}

export const cart = Cart("cart-oop");
export const businessCart = Cart("business-cart");
cart.loadFromLocalStorage();
businessCart.loadFromLocalStorage();
console.log(cart);
console.log(businessCart);
