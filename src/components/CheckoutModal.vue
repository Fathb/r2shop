<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <form @submit.prevent="submit">
        <h2>Checkout</h2>

        <input v-model="form.name" placeholder="Nama" required />
        <textarea v-model="form.address" placeholder="Alamat" required rows="8" />
        <input type="number" v-model="form.whatsapp" placeholder="Nomor WA" required />

        <select v-model="form.payment" required>
          <option value="cod">Cash on Delivery</option>
          <option value="transfer">Bank Transfer</option>
        </select>

        <div class="modal-buttons">
          <button type="submit">Lanjut</button>
          <button type="button" @click="$emit('close')">Batal</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit', 'close'])

const form = reactive({
  name: '',
  address: '',
  whatsapp: '',
  payment: 'cod'
})

function submit() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  max-width: 400px;
  margin: 10% auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
}

input, select, textarea {
  padding: 8px;
  margin-bottom: 5px;
  outline: none;
  border: .2px solid blueviolet;
  border-radius: 8px;
}

textarea {
  resize: vertical;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.modal-buttons button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  box-shadow: .5px .5px 1px black;
  font-weight: bold;
}
.modal-buttons button[type="submit"] {
  margin-right: 15px;
  background-color: #00f000;
}
.modal-buttons button[type="button"] {
  background-color: red;
}
</style>

