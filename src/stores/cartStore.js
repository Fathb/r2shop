// src/stores/cartStore.js
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';

export const useCartStore = defineStore('cart', ()=>{
	const items = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

	const cartItems = computed(()=>items.value);
	const cartTotal = computed(()=>items.value.reduce((sum, item) => sum + item.quantity, 0))
	const amountTotal = computed(()=>cartItems.value.reduce((sum, item) => sum + (item.quantity * item.Harga), 0))

	function addToCart(product) {
      const existingitem = items.value.find(item => item.Kode === product.Kode);
      if (existingitem) {
        existingitem.quantity += 1;
      } else {
        items.value.push({ 
		  Kode: product.Kode,
		  Nama: product.Nama,
		  Harga: product.Harga,
		  quantity: 1 });
      }
	  saveCart();
    }

	function removeFromCart(id) {
      items.value = items.value.filter(item => item.Kode !== id);
	  saveCart();
    }

	function clearCart() {
      items.value = []
      saveCart()
    }

	function saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(items.value))
    }
	function plusQuant(id){
		let prod = items.value.find(it=>it.Kode==id);
		prod.quantity +=1
		saveCart();
	}
	function minQuant(id){
		let prod = items.value.find(it=>it.Kode==id);
		prod.quantity -=1
		saveCart();
	}

	return {items,cartItems,cartTotal,amountTotal,addToCart,removeFromCart, clearCart, saveCart, plusQuant,minQuant}
  }
);

