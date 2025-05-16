<template>
  <div>
    <h1>Produk di Toko Kita</h1>
    <div class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.Kode"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          `https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec?sheet=products`
        );
        this.products = response.data;
	console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
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

