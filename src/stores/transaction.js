import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    customer: {
      name: '',
      address: '',
      phone: '',
      paymentMethod: '',
    },
    items: [],
    isCheckedOut: false,
  }),
  actions: {
    setCustomerData(data) {
      this.customer = data;
    },
    addItemToTransaction(product) {
      this.items.push(product);
    },
    clearTransaction() {
      this.customer = {
        name: '',
        address: '',
        phone: '',
        paymentMethod: '',
      };
      this.items = [];
      this.isCheckedOut = false;
    },
  },
  //persist: true, // Menyimpan state ke localStorage
});
