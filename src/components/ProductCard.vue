<template>
  <div class="product-card" >
	<div @click="goToDetail">
    <img :src="product.Gambar" alt="Product Image" />
    <h3>{{ product.Nama }}</h3>
    <p>
      {{
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Harga)
      }}
    </p>
	</div>
	<div class="actions">
	  <span class="action shopee" @click="openShopee">
		<i class="material-icons">local_mall</i>
		<small>Shopee</small>
	  </span>
	  <span class="action tokopedia" @click="openToped">
		<i class="material-icons">shopping_bag</i>
		<small>Tokopedia</small>
	  </span>
	  <span class="action keranjang" @click="cart.addToCart(product)">
		<i class="material-icons">add_shopping_cart</i>
		<small>Masukkan Keranjang</small>
	  </span>
	</div>
  </div>
</template>

<script setup>
import router from '@/router';
import { useCartStore } from '@/stores/cartStore';

const {product}=defineProps(["product"]);
const cart = useCartStore();

function goToDetail(){
  router.push(`/product/${product.Kode}`);
}

function openShopee() {
   window.open(product["link shopee"],"_blank")
}
function openToped() {
   window.open(product["link toko"],"_blank")
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  width: 40vw;
  max-width: 300px;
  display: block;
}
.product-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.action {
 display: flex;
 flex-direction: column;
 justify-content: start;
}
.material-icons {
  font-size: 2.4rem;
}
.shopee {
  color: #f93827;
}
.tokopedia {
  color: green;
}
.keranjang {
  color: blue;
}
small {
  font-size: 8px;
}
</style>
