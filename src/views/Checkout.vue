<template>
  <div>
    <h1>Detail Transaksi</h1>

    <div class="data-pelanggan">
      <h3>Data Pelanggan</h3>
	  <table>
		<tbody>
		  <tr>
		    <th>Nama</th>
		    <td>:</td>
  		    <td>{{ transaction.customer.name }}</td>
		  </tr>
		  <tr>
		    <th>Alamat</th>
  		    <td>:</td>
  		    <td>{{ transaction.customer.address }}</td>
  		  </tr>
	  	  <tr>
		    <th>No WA</th>
  	  	    <td>:</td>
  	  	    <td>{{ transaction.customer.whatsapp }}</td>
  	  	  </tr>
	  	  <tr>
		    <th>Metode Bayar</th>
  	  	    <td>:</td>
  	  	    <td>{{ transaction.customer.payment }}</td>
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
			<td>Rp. {{transaction.customer.amountTotal}}</td>
	      </tr>
	    </tfoot>
	  </table>
    </div>

    <button @click="confirmOrder">Buat Pesanan</button>
  </div>
</template>

<style scoped>
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
</style>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { onMounted, ref } from 'vue'

const router = useRouter()
const cart = useCartStore()

const transaction = ref({ customer: {}, items: [] })

onMounted(() => {
  const data = localStorage.getItem('currentTransaction')
  if (data) {
    transaction.value = JSON.parse(data)
  }
})

const confirmOrder = () => {
  const allTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
  allTransactions.push(transaction.value)
  localStorage.setItem('transactions', JSON.stringify(allTransactions))

  cart.clearCart()
  localStorage.removeItem('currentTransaction')
  router.push('/')
}
</script>
