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
		initProducts(state, products) {
			state.products = products;
		},
	},

	actions: {
		async GET_PRODUCTS({ commit }) {
			axios
				.get('http://localhost:8080/db/db.json')
				.then((response) => commit('initProducts', response.data));
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

		productBaseCost: (state) => (code) => {
			const products = state.products;
			let product = null;

			for (let key in products) {
				product = products[key].find((item) => item.code === +code);

				if (product) {
					break;
				}
			}

			return product.price[0];
		},
	},

	modules: { cart },
});
