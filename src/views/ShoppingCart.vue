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
			<button @click="cartStore.minQuant(item.Kode)" class="icon-button min" v-if="item.quantity > 1">
            <span class="material-icons">remove</span>
          </button>
          <button @click="cartStore.plusQuant(item.Kode)" class="icon-button add">
            <span class="material-icons">add</span>
          </button>
          <button @click="removeFromCart(item.Kode)" class="icon-button rm">
			<span class="material-icons">delete</span>
		  </button>
		</div>
      </li>
    </ul>
    <div v-if="cartItems.length > 0">
      <p>Total: Rp {{ amountTotal }}</p>
    </div>
	<button v-if="cartItems.length > 0" @click="showModal = true" class="checkout-btn">Checkout</button>

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
  import { useTransactionStore } from '@/stores/transaction';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import CheckoutModal from '@/components/CheckoutModal.vue';
  import axios from 'axios';
  
  const cartStore = useCartStore();
  const transactionStore = useTransactionStore();
  transactionStore.loadTransactions();
  const router = useRouter();
  
  const showModal = ref(false);
  
  const cartItems = computed(()=>cartStore.cartItems);
  const amountTotal = computed(()=>cartStore.amountTotal);
  const removeFromCart = cartStore.removeFromCart;
  async function handleCheckout(formData) {
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
	  id: transactionStore.transactions.length + 1,
  	  ...formData,
  	  amountTotal: cartStore.amountTotal,
  	  items: items,
	  isCheckedOut: "Belum Co"
    }
  
    let next = confirm("data keranjang akan dihapus setelah dibuat pesanan");
    if (next) {
		const response = await axios.post('https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec',JSON.stringify({...transactionData, sheet:"orders"}));
  
      if (response.status === 200) {
		transactionStore.addTransaction(transactionData)
    	cartStore.clearCart();
        showModal.value = false
        router.push('/transaction/'+transactionData.id)
      }
  
  
      
    }
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
	  width: 100%;
	}
	li div:nth-child(1) {
	  width: 80%;
	  border-bottom: .2px dotted black;
	  border-right: .1px dashed purple;
	  margin-right: auto;
	}
	li div:nth-child(2){
	  width:25%;
	  border-right: 2px dashed red;
	  display: flex;
	  align-items: end;
	}
	.shopping-cart button.icon-button {
	  background-color: #dd0000;
	  color: darkblue;
	  border: none;
	  cursor: pointer;
	  border-radius: 4px;
	  margin:auto 3px;
	  padding: 1px;
	}
	button.icon-button.min{
	  background-color: yellow;
	  margin-left: auto;
	}
	button.icon-button.add{
	  background-color: green;
	  margin-left: auto;
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
