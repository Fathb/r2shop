import {sheetTrx, sheetUrl} from '@/settings';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],// Menyimpan semua transaksi
	noWa: localStorage.getItem("noWA") || ""
  }),
  getters: {
	filteredTrx({noWa,transactions}){
	  //let noWa = localStorage.getItem("noWA");
	  let id = 0
	  return transactions.filter(trx=>{
		trx.whatsapp==noWa ? (trx.id = id, id++ ) : void(0);
		return trx.whatsapp==noWa
	  })
	}
  },
  actions: {
    // Menambahkan transaksi baru ke dalam history
    async addTransaction(transaction) {
	  let response = await axios.post('https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec',JSON.stringify({...transaction, sheet:sheetTrx}))
	  return response
    },
    // Memuat transaksi dari backend atau localStorage
    async loadTransactions() {
      try {
        // Misalnya kita mengambil data transaksi dari API atau localStorage
		let data = (await axios.get(sheetUrl+sheetTrx)).data;
		data = (await data).map(function (el) {
		  let items = []
		  let item = {}
		  el.items = el.items.split(",")
		  el.items.forEach((it,id)=>{
			if(id % 4 === 0 ) item.Nama = it;
			if(id % 4 === 1 ) item.Harga = it;
			if(id % 4 === 2 ) item.quantity = it;
			if(id % 4 === 3 ) {
			  item.subtotal = it;
			  items.push(item);
			  item = {}
			}
		  })
		  el.items = items;
		  return el;
		});
		//data[0].items = await data[0].items.split(",");
		this.noWa = localStorage.getItem("noWA") || "";
        const storedTransactions = await data;
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
  }
});

