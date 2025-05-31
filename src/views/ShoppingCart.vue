<template>
  <div class="shopping-cart">
    <h2>Keranjang Belanja</h2>
    <div v-if="cartItems.length === 0">Keranjang Anda kosong.</div>
    <ul v-else>
      <li v-for="item in cartItems" :key="item.Kode">
		<div>
		  {{ item.Nama }} Rp. {{item.Harga}} x {{ item.quantity }} - Rp. {{ item.Harga * item.quantity }}
		</div>
		<div>
		  <button @click="cart.decreaseQuantity(item.id)" class="icon-button">
            <span class="material-icons">remove</span>
          </button>
          <button @click="cart.increaseQuantity(item.id)" class="icon-button">
            <span class="material-icons">add</span>
          </button>
          <button @click="removeFromCart(item.Kode)">Hapus</button>
		</div>
      </li>
    </ul>
    <div v-if="cartItems.length > 0">
      <p>Total: Rp {{ amountTotal }}</p>
    </div>
	<button @click="showModal = true">Checkout</button>

    <!-- Modal Checkout -->
    <CheckoutModal
      v-if="showModal"
      @submit="handleCheckout"
      @close="showModal = false"
    />	
  </div>
</template>

<script setup>
	import { useCartStore } from '../stores/cartStore';
	import { computed, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import CheckoutModal from '@/components/CheckoutModal.vue';

    const cartStore = useCartStore();
	const router = useRouter();

	const showModal = ref(false);
	
    const cartItems = computed(()=>cartStore.cartItems);
	const amountTotal = computed(()=>cartStore.amountTotal);
    const removeFromCart = cartStore.removeFromCart;
	function handleCheckout(formData) {
	  let items = cartStore.cartItems.map(i=>{
		return {
		  Nama: i.Nama,
		  Harga: i.Harga,
		  Kode: i.Kode,
		  quantity: i.quantity,
		  subtotal: i.quantity * i.Harga
		}
	  })
	  const transactionData = {
	    customer: formData,
	    items: items
	  }
	  
	  alert(JSON.stringify(transactionData));
	
	  localStorage.setItem("currentTransaction",JSON.stringify(transactionData))
	
	  cartStore.clearCart();
	  showModal.value = false
	  router.push('/transaction')
	}	
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
	  margin-right: 5px;
	}
	.shopping-cart button.icon-button {
	  background-color: #0000ff;
	  color: black;
	  padding: 1px;
	  font-size: 10px;
	  border-radius: 50%;
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

