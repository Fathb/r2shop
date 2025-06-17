<template>
  <div>
    <h2>Riwayat Transaksi</h2>
    <div v-if="transactions.length === 0">Tidak ada transaksi yang ditemukan.</div>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="index">
        <div class="trxCard" :class="transaction.isCheckedOut?'finish':'unfinish'"  @click="toDetails(transaction.id)">
          <strong>{{ transaction.name }}</strong><br />
		  Metode Pembayaran: {{ transaction.payment }}<br/>
		  {{ (transaction.isCheckedOut ? "status: sudah co" : "status: belum co") }}<br />
		  <strong>Total Harga Barang: {{transaction.amountTotal}}</strong>
        </div>
      </li>
    </ul>
	<button @click="trxStore.clearTrx">bersihkan transaksi</button>
  </div>
</template>

<script setup>
import router from '@/router';
import {useTransactionStore} from '@/stores/transaction';
import {computed} from 'vue';


const trxStore = useTransactionStore();
trxStore.loadTransactions();
const transactions = computed(()=>trxStore.transactions);

function toDetails(id){
  router.push("/transaction/"+id)
}
</script>

<style scoped>
h2 {
 text-align: center;
}
li {
 list-style-type: none;
 margin-left: -25px;
}
.trxCard {
 border: .3px solid black;
 border-radius: 8px;
 margin-bottom: 10px;
 padding: 10px;
 box-shadow: 1px 1px 1px black;
 background-color: yellow;
}
.trxCard.finish {
 background-color: green;
}
</style>
