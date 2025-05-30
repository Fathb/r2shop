<template>
  <form @submit.prevent="handleCheckout">
    <div>
      <label for="name">Nama</label>
      <input id="name" v-model="name" required />
    </div>
    <div>
      <label for="address">Alamat</label>
      <input id="address" v-model="address" required />
    </div>
    <div>
      <label for="phone">Nomor WA</label>
      <input id="phone" v-model="phone" required />
    </div>
    <div>
      <label for="paymentMethod">Metode Pembayaran</label>
      <select id="paymentMethod" v-model="paymentMethod" required>
        <option value="bankTransfer">Transfer Bank</option>
        <option value="cod">COD</option>
      </select>
    </div>
    <button type="submit">Kirim</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const name = ref('');
const address = ref('');
const phone = ref('');
const paymentMethod = ref('bankTransfer');

const transactionStore = useTransactionStore();

const handleCheckout = () => {
  transactionStore.setCustomerData({
    name: name.value,
    address: address.value,
    phone: phone.value,
    paymentMethod: paymentMethod.value,
  });
  transactionStore.isCheckedOut = true;
  // Bersihkan keranjang setelah checkout
  localStorage.removeItem('cart');
};
</script>
