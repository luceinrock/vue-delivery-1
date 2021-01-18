import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home'),
		children: [
			{
				path: '',
				name: 'all',
				component: () => import('../components/Catalog'),
			},
			{
				path: 'categories/:categoryName',
				name: 'category',
				component: () => import('../components/Catalog'),
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
