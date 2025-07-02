<template>
  <p v-if="!product">Loading...</p>
  <div v-else>
    <h3>{{ product.Nama }}</h3>
    <img :src="product.Gambar+'&sz=w500'" alt="Product Image" />
    <h4>
      {{
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Harga)
      }}
    </h4>
    <button  @click="addToCart(product)">Masukkan Keranjang</button>
    <button v-if="product['link toko'] != ''" @click="buyOnTokopedia">Beli di Tokopedia</button>
    <button class="shopee" v-if="product['link shopee'] != ''" @click="buyOnShopee">
      Beli di Shopee
    </button>
    <button class="wa" @click="buyOnWhatsApp">WA Penjual</button>
    <hr />
    <p>{{ product.Keterangan }}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
img {
  border: 0.7px solid #bbb;
  border-radius: 10px;
  padding: 5px;
  width: 80%;
  height: 400px;
  max-width: 400px;
  object-fit: cover;
  box-shadow: 0.3px 0.3px 2px 1px rgba(0, 0, 0, 1);
}
button {
  background-color: #04aa6d; /* Green */
  border: none;
  border-radius: 8px;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 20px;
  box-shadow: 0.3px 0.3px 2px black;
}

button.wa {
  background-color: transparent;
  border: 0.2px solid green;
  box-shadow: 0.3px 0.3px 8px green;
}

button.shopee {
  background-color: #f93827;
}
</style>

<script setup>
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cartStore'
import {computed, watchEffect} from 'vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const {id} = defineProps(["id"])

const products = computed(()=>productStore.products)
let product = computed(()=> products.value.find(p=>p.Kode===id))

 
function buyOnTokopedia () {
      window.open(product.value['link toko'], '_blank')
    }
function buyOnShopee() {
      window.open(product.value['link shopee'], '_blank')
    }
function buyOnWhatsApp() {
      window.open(product.value['link wa'], '_blank')
    }
function addToCart(p){
	cartStore.addToCart(p)
	}
watchEffect(() => {
  if (product.value && product.value.Nama) {
    document.title = product.value.Nama
  }
})
</script>
