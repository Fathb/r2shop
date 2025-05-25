<template>
  <div v-if="product">
    <h3>{{ product.Nama }}</h3>
    <img :src="product.Gambar" alt="Product Image" />
    <h4>{{product.Harga}}</h4>
    <button v-if="product['link toko'] != ''" @click="buyOnTokopedia">Beli di Tokopedia</button>
    <button class="shopee" v-if="product['link shopee'] != ''" @click="buyOnShopee">Beli di Shopee</button>
    <button class="wa" @click="buyOnWhatsApp">WA Penjual</button>
    <hr>
    <p>{{ product.Keterangan }}</p>
  </div>
  <p v-else>Loading...</p>
</template>

<style scoped>
  div {
    text-align: center;
  }
  img {
    border: .7px solid #bbb;
    border-radius: 10px;
    padding: 5px;
    width: 80%;
    box-shadow: .3px .3px 2px 1px rgba(0,0,0,1);
  }
  button {
    background-color: #04AA6D; /* Green */
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
    box-shadow: .3px .3px 2px black;
  }

  button.wa {
    background-color: transparent;
    border: .2px solid green;
    box-shadow: .3px .3px 8px green;
  }

  button.shopee {
    background-color: #F93827;	
  }
</style>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(
          `https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec?sheet=products`
        );
        const products = response.data;
        this.product = products.find(p => p.Kode == this.id);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    },
    buyOnTokopedia() {
      window.open(this.product["link toko"], '_blank');
    },
    buyOnShopee() {
      window.open(this.product["link shopee"], '_blank');
    },
    buyOnWhatsApp() {
      window.open(this.product["link wa"], '_blank');
    },
  },
};
</script>
