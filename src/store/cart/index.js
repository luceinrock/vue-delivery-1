export default {
	state: () => ({
		cart: [],
	}),

	mutations: {
		addProduct(state, product) {
			state.cart.push(product);
		},

		addToQuantity(state, index) {
			state.cart[index].amount++;
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
				(item) => item.price === product.price && item.title === product.title
			);

			if (indexInCart >= 0) {
				commit('addToQuantity', indexInCart);
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
			return state.cart.length;
		},

		getCartList(state) {
			return state.cart;
		},

		getTotalPrice(state) {
			const totalPrice = state.cart.reduce((prev, current) => {
				return current.price * current.amount + prev;
			}, 0);

			return totalPrice;
		},
	},
};
