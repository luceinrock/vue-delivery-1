import { storage } from './utils';

export default {
	state: () => ({
		cart: null,
	}),

	mutations: {
		setCart(state, payload) {
			state.cart = payload;
		},

		addProduct(state, product) {
			state.cart.push(product);
		},

		addToQuantity(state, { index, amount }) {
			state.cart[index].amount = state.cart[index].amount + amount;
		},

		subtractFromQuantity(state, index) {
			state.cart[index].amount--;
		},

		deleteFromCart(state, index) {
			state.cart.splice(index, 1);
		},

		removeCart(state) {
			state.cart = [];
		},
	},

	actions: {
		setCart({ commit }) {
			const cart = storage.fetch('cart') || [];
			commit('setCart', cart);

			this.watch(
				(state, getters) => getters.cart,
				(cart) => {
					storage.save(cart, 'cart');
				},
				{ deep: true }
			);
		},

		addProduct({ state, commit }, product) {
			const indexInCart = state.cart.findIndex(
				(item) => item.size === product.size && item.title === product.title
			);

			if (indexInCart >= 0) {
				commit('addToQuantity', { index: indexInCart, amount: product.amount });
			} else {
				commit('addProduct', product);
			}
		},

		deleteFromCart({ commit }, index) {
			commit('deleteFromCart', index);
		},

		addToQuantity({ commit }, index) {
			commit('addToQuantity', index);
		},

		subtractFromQuantity({ state, commit }, index) {
			if (state.cart[index].amount === 1) {
				commit('deleteFromCart', index);
			} else {
				commit('subtractFromQuantity', index);
			}
		},

		removeCart({ commit }) {
			commit('removeCart');
		},
	},

	getters: {
		cart(state) {
			return state.cart;
		},

		isCartEmpty(state) {
			return state.cart.length === 0;
		},

		cartLength(state) {
			return state.cart.reduce((prev, item) => prev + item.amount, 0);
		},

		getCartList(state) {
			return state.cart;
		},

		TotalPrice(state) {
			const totalPrice = state.cart.reduce((prev, current) => {
				return current.cost * current.amount + prev;
			}, 0);

			return totalPrice;
		},
	},
};
