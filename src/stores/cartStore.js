// src/stores/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  }),
  getters: {
    cartItems: (state) => state.items,
    cartTotal: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    amountTotal: (state) => state.items.reduce((sum, item) => sum + (item.quantity * item.Harga), 0)
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.Kode === product.Kode);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
	  this.saveCart();
      this.updateTotal();
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item.Kode !== id);
	  this.saveCart();
      this.updateTotal();
    },
	clearCart() {
      this.items = []
      this.saveCart()
    },
	saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    }
  },
});

