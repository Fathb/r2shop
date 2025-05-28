<template>
  <div class="filter">
    <input
      v-model="filters.search"
      placeholder="Cari produk..."
      @input="updateFilter('search', filters.search)"
    />

    <select v-model="filters.tipe" @change="updateFilter('tipe', filters.tipe)">
      <option value="">Semua Kategori</option>
      <option value="Bold / Reguler">Bold</option>
      <option value="Filter Reguler">Reguler</option>
      <option value="Mild">Mild</option>
      <option value="Putian">Putian</option>
      <option value="Klick">Klick</option>
    </select>

    <div>
      <label>Harga Minimum</label>
      <input
        type="number"
        v-model.number="filters.priceMin"
        @input="updateFilter('priceMin', filters.priceMin)"
      />
      <label>Harga Maksimum</label>
      <input
        type="number"
        v-model.number="filters.priceMax"
        @input="updateFilter('priceMax', filters.priceMax)"
      />
    </div>

    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>
.filter {
  width: 90vw;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 5px 8px;
  font-size: medium;
}
input,
select,
button {
  padding: 10px;
  border-radius: 8px;
}
.filter div {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px 0px;
}
</style>

<script setup>
import { useProductStore } from '@/stores/products'
import { reactive } from 'vue'

const store = useProductStore()

const filters = reactive({ ...store.filters })

function updateFilter(key, value) {
  store.setFilter(key, value)
}

function reset() {
  store.resetFilters()
  Object.assign(filters, store.filters)
}
</script>
