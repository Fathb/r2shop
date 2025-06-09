import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductDetailPage from './views/ProductDetailPage.vue';
import ShoppingCart from './views/ShoppingCart.vue';
import Checkout from '@/views/Checkout.vue';

const routes = [
  { path: '/', component: Home },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart,
  },
	{ path: '/product/:id', component: ProductDetailPage, props: true, name:"detail Product" },
  {
	path: '/transaction/:id',
    name: 'Transacton',
    component: Checkout,
	props: true
  },
  { path: '/:pathMatch(.*)', component: Home },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

