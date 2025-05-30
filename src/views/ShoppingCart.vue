<template>
  <div class="shopping-cart">
    <h2>Keranjang Belanja</h2>
    <div v-if="cartItems.length === 0">Keranjang Anda kosong.</div>
    <ul v-else>
      <li v-for="item in cartItems" :key="item.Kode">
        {{ item.Nama }} x{{ item.quantity }} - Rp{{ item.Harga * item.quantity }}
        <button @click="removeFromCart(item.Kode)">Hapus</button>
      </li>
    </ul>
    <div v-if="cartItems.length > 0">
      <p>Total: Rp {{ amountTotal }}</p>
    </div>
	<!-- Tombol Checkout -->
    <button @click="showCheckoutModal" class="checkout-btn">Checkout</button>
  </div>
</template>

<script setup>
	import { useCartStore } from '../stores/cartStore';
	import { computed, ref } from 'vue';

    const cartStore = useCartStore();


	function showCheckoutModal() {
		checkoutModal.value = true;
	}	
	
	const checkoutModal = ref(false);
	
    const cartItems = computed(()=>cartStore.cartItems);
	const amountTotal = computed(()=>cartStore.amountTotal);
    const removeFromCart = cartStore.removeFromCart;
</script>

<style scoped>
	.shopping-cart {
	  padding: 15px;
	  background-color: #cccccc;
	  border-radius: 8px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.shopping-cart h2 {
	  margin-bottom: 10px;
	}
	.shopping-cart ul {
	  list-style-type: none;
	  padding: 0;
	}
	.shopping-cart li {
	  display: flex;
	  justify-content: space-between;
	  margin-bottom: 8px;
	}
	.shopping-cart button {
	  background-color: #e74c3c;
	  color: white;
	  border: none;
	  padding: 5px 10px;
	  cursor: pointer;
	  border-radius: 4px;
	}
	.shopping-cart button:hover {
	  background-color: #c0392b;
	}
	.checkout-btn {
	  background-color: #4CAF50;
	  color: white;
	  padding: 10px 20px;
	  border: none;
	  cursor: pointer;
	  font-size: 16px;
	  margin-top: 20px;
	}
	
	.checkout-btn:hover {
	  background-color: #45a049;
	}
</style>

