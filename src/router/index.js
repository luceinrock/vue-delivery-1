import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home'),
	},

	{
		path: '/cart',
		name: 'cart',
		component: () => import('../views/Cart'),
	},

	{
		path: '/product/:code',
		props: true,
		name: 'product',
		component: () => import('../views/Product'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
});

export default router;
