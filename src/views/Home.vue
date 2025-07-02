<template>
  <div>
    <h1>Produk di Toko-R2</h1>
    <ProductFilter />
    <div v-if="productStore.filteredProducts.length < 1">
	  loading ......
	</div>
    <div class="product-list" v-else>
      <ProductCard
        v-for="product in productStore.filteredProducts"
        :key="product.Kode"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductFilter from '@/components/ProductFilter.vue'
//import {onBeforeMount} from 'vue'

const productStore = useProductStore()

//onBeforeMount(()=>productStore.fetchProducts())
</script>

<style scoped>
h1 {
  text-align: center;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
