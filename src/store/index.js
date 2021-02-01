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
			state.loading = false;
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
			{
				let product = null;

				Object.values(state.products).some((val) => {
					product = val.find((item) => item.code === +code);
					return product;
				});

				return product;
			}
		}
	},

	modules: { cart },
});
