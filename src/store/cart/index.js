export default {
	state: () => ({
		cart: [],
	}),

	mutations: {
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
	},

	actions: {
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
	},

	getters: {
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
