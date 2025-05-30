import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    filters: {
      tipe: '',
      priceMin: 0,
      priceMax: 999999,
      search: '',
    },
  }),

  getters: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchCategory = this.filters.tipe !== '' ? product.tipe === this.filters.tipe : true

        const matchSearch =
          this.filters.search !== ''
            ? product.Nama.toLowerCase().includes(this.filters.search.toLowerCase())
            : true

        const matchPrice =
          product.Harga > this.filters.priceMin && product.Harga < this.filters.priceMax

        return matchCategory && matchSearch && matchPrice
      })
    },
  },

  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          `https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec?sheet=products`
        )
        this.products = await response.data
      } catch (err) {
        this.error = err.message || 'Gagal memuat produk'
      } finally {
        this.products
      }
    },

    setFilter(key, value) {
      this.filters[key] = value
    },
    resetFilters() {
      this.filters = {
        tipe: '',
        priceMin: 0,
        priceMax: 999999,
        search: '',
      }
    },
  },
})
