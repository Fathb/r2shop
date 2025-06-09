<template>
  <h1>Detail Transaksi</h1>
  <div v-if="transaction">

    <div class="data-pelanggan">
      <h3>Data Pelanggan</h3>
	  <table>
		<tbody>
		  <tr>
		    <th>Nama</th>
		    <td>:</td>
  		    <td>{{ transaction.name }}</td>
		  </tr>
		  <tr>
		    <th>Alamat</th>
  		    <td>:</td>
  		    <td>{{ transaction.address }}</td>
  		  </tr>
	  	  <tr>
		    <th>No WA</th>
  	  	    <td>:</td>
  	  	    <td>{{ transaction.whatsapp }}</td>
  	  	  </tr>
	  	  <tr>
		    <th>Metode Bayar</th>
  	  	    <td>:</td>
  	  	    <td>{{ transaction.payment }}</td>
  	  	  </tr>
 		</tbody>
 	  </table>
    </div>

    <div class="data-items">
      <h3>Item Dipesan</h3>
	  <table>
	    <thead>
	      <tr>
	        <th>Item</th>
	        <th>Harga</th>
	        <th>Vol</th>
	        <th>Subtotal</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr v-for="(item, index) in transaction.items" :key="index">
			  <td>{{item.Nama}}</td>
			  <td>{{item.Harga}}</td>
			  <td>{{item.quantity}}</td>
			  <td>Rp. {{item.subtotal}}</td>
	      </tr>
	    </tbody>
	    <tfoot>
	      <tr>
	        <td colspan="3" >total Pesanan</td>
			<td>Rp. {{transaction.amountTotal}}</td>
	      </tr>
	    </tfoot>
	  </table>
    </div>

    <button @click="confirmOrder">Buat Pesanan</button>
  </div>
  <div v-else class="kosong">
	  <strong>tidak ditemukan transaksi dengan id {{id}}</strong>
  </div>
</template>

<style scoped>
.kosong {
  text-align: center;
}
.data-pelanggan {
  text-align: left;
}
.data-items {
  padding-top: 0;
  text-align: left;
}
.data-pelanggan table th {
  width: 25vw;
  max-width: 200px;
  background: none;
}
.data-pelanggan tr:nth-child(even) {
  background-color: #D0F0C0;
}
.data-pelanggan tr:nth-child(odd) {
  background-color: #F0FFF0;
}
table {
  width: 98%;
  border: none;
  border-collapse: collapse;
}
.data-items tr {
  border-bottom: .5px solid black;
}
.data-items td {
  padding: 8px 1px;
}
tfoot tr {
  margin-top: 10px;
  border: .5px solid black;
  background-color: #dddddd;
}
th {
  background-color: rgba(50, 150, 255, .3);
  padding: 8px 4px;
}
h1 {
text-align: center;
background-color: #00aa00;
}
h3 {
  margin-bottom: .7rem;
}
button {
  margin: 15px 15px;
  padding: 8px;
  background-color: lightgreen;
  border-radius: 8px;
  outline: none;
}
</style>

<script setup>
import { useTransactionStore } from '@/stores/transaction';

const dataTransaction = useTransactionStore();
dataTransaction.loadTransactions()
const {id} = defineProps(["id"]);
const transaction = dataTransaction.transactions[id-1]

const confirmOrder =async () => {
 // const allTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
 // allTransactions.push(transaction.value)
 // localStorage.setItem('transactions', JSON.stringify(allTransactions))
 // 
 // alert(JSON.stringify(allTransactions))
 // localStorage.removeItem("transactions")

 // cart.clearCart()
  
  //alert(JSON.stringify(transactionData))

	const textMsg = `detail pesanan saya:
	nama : ${transaction.value.name}
	alamat : ${transaction.value.address}
	pembayaran : ${transaction.value.payment}

	detail items
	nama * Harga * vol * subtotal\n`+transaction.value.items.map(i=>`- ${i.Nama} * ${i.Harga} * ${i.quantity} * ${i.subtotal}`).join("\n")+`\n
	total harga item: Rp. ${transaction.value.amountTotal}

	berapa total dengan ongkirnya bang???`;

	window.open("http://wa.me/6282245965486?text="+encodeURI(textMsg))

	
}
</script>
