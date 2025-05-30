<!-- src/views/CheckoutPage.vue -->
<template>
  <CheckoutForm />
  <TransactionSummary />
</template>

<script setup>
import CheckoutForm from '@/components/CheckoutForm.vue';
import TransactionSummary from '@/components/TransactionSummary.vue';
import { useCartStore } from '@/stores/cartStore';
import { useTransactionStore } from '@/stores/transaction';

const cartStore = useCartStore();
const transactionStore = useTransactionStore();

// Copy isi cart ke transaksi saat halaman dimount
transactionStore.items = [...cartStore.items];
</script>

