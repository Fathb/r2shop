import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: []  // Menyimpan semua transaksi
  }),
  actions: {
    // Menambahkan transaksi baru ke dalam history
    addTransaction(transaction) {
      this.transactions.push(transaction);
	  this.saveTransactions();
    },
    // Memuat transaksi dari backend atau localStorage
    async loadTransactions() {
      try {
        // Misalnya kita mengambil data transaksi dari API atau localStorage
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactions = storedTransactions;
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    },
    // Menyimpan transaksi ke localStorage
    saveTransactions() {
      try {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      } catch (error) {
        console.error('Failed to save transactions:', error);
      }
    },
	clearTrx(){
	  localStorage.removeItem("transactions");
	  this.loadTransactions();
	}
  }
});

