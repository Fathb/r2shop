<template>
  <div class="product-card" @click="goToDetail">
    <img :src="product.Gambar" alt="Product Image"/>
    <h3>{{ product.Nama }}</h3>
    <p>{{ product.Harga }}</p>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    goToDetail() {
      this.$router.push(`/product/${this.product.Kode}`);
    },
  },
};
</script>

<style scoped>
.product-card {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}
.product-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>

