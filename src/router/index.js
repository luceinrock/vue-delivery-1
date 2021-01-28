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
		meta: { scrollToTop: true },
	},

	{
		path: '/product/:code',
		props: true,
		name: 'product',
		component: () => import('../views/Product'),
		meta: { scrollToTop: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to, from, savedPosition) =>
		new Promise((resolve) => {
			const position = savedPosition || {};
			if (!savedPosition) {
				if (to.hash) {
					position.selector = to.hash;
				}
				if (to.matched.some((m) => m.meta.scrollToTop)) {
					position.x = 0;
					position.y = 0;
				}
			}
			router.app.$root.$once('triggerScroll', () => {
				router.app.$nextTick(() => resolve(position));
			});
		}),
});

export default router;
