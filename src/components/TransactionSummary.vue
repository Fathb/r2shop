<!-- src/components/TransactionSummary.vue -->
<template>
  <div v-if="transactionStore.isCheckedOut">
    <h2>Ringkasan Transaksi</h2>
    <p><strong>Nama:</strong> {{ transactionStore.customer.name }}</p>
    <p><strong>Alamat:</strong> {{ transactionStore.customer.address }}</p>
    <p><strong>Nomor WA:</strong> {{ transactionStore.customer.phone }}</p>
    <p><strong>Metode Pembayaran:</strong> {{ transactionStore.customer.paymentMethod }}</p>
    <h3>Produk yang Dibeli:</h3>
    <ul>
      <li v-for="item in transactionStore.items" :key="item.Kode">
        {{ item.Nama }} - {{ item.Harga | currency }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transaction';

const transactionStore = useTransactionStore();
</script>

