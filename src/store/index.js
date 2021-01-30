import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import cart from './cart';

export default new Vuex.Store({
	state: {
		products: null,
	},
	mutations: {
		setProducts(state, products) {
			state.products = products;
		},
	},

	actions: {
		async GET_PRODUCTS({ commit }) {
			try {
				const response = await axios.get('http://localhost:8080/db/db.json');
				commit('setProducts', response.data);
			} catch (error) {
				console.log(error);
			}
		},
	},

	getters: {
		product: (state) => (code) => {
			const products = state.products;
			let product = null;

			for (let key in products) {
				product = products[key].find((item) => item.code === +code);

				if (product) {
					break;
				}
			}

			return product;
		},

		productDefaultSize: (state) => (code) => {
			const products = state.products;
			let product = null;

			for (let key in products) {
				product = products[key].find((item) => item.code === +code);

				if (product) {
					break;
				}
			}

			return product.meta[0];
		},
	},

	modules: { cart },
});
