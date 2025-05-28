<template>
  <div>
    <h1>Produk di Toko-R2</h1>
    <ProductFilter />
    <div class="product-list">
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

const productStore = useProductStore()

productStore.fetchProducts()
</script>

<style scoped>
h1 {
  text-align: center;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}
</style>
