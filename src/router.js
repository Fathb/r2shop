import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductDetailPage from './views/ProductDetailPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetailPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

