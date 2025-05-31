<template>
  <div>
	<nav class="bottom-navbar">
	 <div class="nav-list">
      <router-link to="/" class="nav-item">
		<i class="material-icons">home</i>
		<small>	Home </small>
	  </router-link>
      <router-link to="/cart" class="nav-item">
		<i class="material-icons">shopping_cart_checkout</i>
		<small> Keranjang </small>
	  </router-link>
      <router-link to="/transaction" class="nav-item">
		<i class="material-icons">receipt_long</i>
		<small> Pesanan </small>
	  </router-link>
	 </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0ffff0;
  border-top: 1px solid #ccc;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.nav-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  text-decoration: none;
}

.nav-item:hover {
  background-color: #f2f2f2;
}

.material-icons {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 3px;
}
</style>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { computed } from 'vue';

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.cartTotal);
</script>
