import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

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
	modules: {},
});
