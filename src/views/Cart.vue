<template>
	<div class="cart">
		<header class="cart__header">
			<h1 class="cart__title title">Cart</h1>

			<a
				href="/"
				class="product__back btn-back"
				@click.prevent="$router.go(-1)"
			>
				<span class="material-icons"> keyboard_backspace </span>
			</a>
		</header>

		<ul class="cart__list" v-if="!isCartEmpty">
			<li class="cart__item" v-for="(item, index) in cartList" :key="index">
				<img :src="item.image" :alt="item.title" class="cart__item-img" />

				<div class="cart__item-info">
					<span class="cart__item-title">
						{{ item.title }}
					</span>

					<span class="cart__item-total-cost">
						$ {{ (item.cost * item.amount) | toFixed }}
					</span>

					<span class="cart__item-size">
						{{ item.size | capitalize }}
					</span>
				</div>

				<Counter
					class="cart__counter"
					@increment="addOne(index)"
					@decrement="decreaseOne(index)"
					>{{ item.amount }}
				</Counter>

				<button class="cart__item-delete" @click="deleteItemInCart(index)">
					<span class="material-icons"> clear </span>
				</button>
			</li>
		</ul>

		<form class="cart__total" v-if="!isCartEmpty">
			<div class="cart__total-row">
				<span class="cart__total-text">Total</span>
				<span class="cart__total-price">$ {{ totalPrice | toFixed }}</span>
			</div>

			<button type="submit" class="cart__total-submit">Pay</button>
		</form>

		<div class="cart__empty" v-if="isCartEmpty">
			<img
				:src="require('@/assets/emptyCart.png')"
				alt="Empty cart"
				class="cart__empty-img"
			/>
		</div>
	</div>
</template>

<script>
import Counter from '../components/Counter';

export default {
	name: 'Cart',
	components: { Counter },
	computed: {
		cartList() {
			return this.$store.getters.getCartList;
		},

		totalPrice() {
			return this.$store.getters.TotalPrice;
		},

		isCartEmpty() {
			return this.$store.getters.isCartEmpty;
		},
	},

	methods: {
		addOne(index) {
			this.$store.dispatch('addToQuantity', { index, amount: 1 });
		},

		decreaseOne(index) {
			this.$store.dispatch('subtractFromQuantity', index);
		},

		deleteItemInCart(index) {
			this.$store.commit('deleteFromCart', index);
		},
	},
};
</script>

<style lang="scss">
.cart {
	padding-bottom: 140px;
	flex-grow: 1;
	padding-top: 20px;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px 0 15px;
		margin-bottom: 20px;
	}

	&__title {
		margin: 0;
		font-size: 1.7rem;
	}

	&__list {
		margin: 0;
		padding: 0 10px;
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	&__item {
		display: flex;
		align-items: center;
		padding: 5px 10px 5px 5px;
		background-color: #fff;
		margin-bottom: 10px;
		border-radius: 10px;

		&-img {
			width: 80px;
			height: 80px;
			margin-right: 10px;
		}

		&-info {
			display: flex;
			flex-direction: column;
			font-size: 0.8rem;
			max-width: 30%;
		}

		&-total-cost {
			font-weight: 700;
		}

		&-size {
			color: rgb(163, 163, 163);
		}

		&-delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			background: none;
			border: none;
			color: rgb(163, 163, 163);
			cursor: pointer;

			&:hover {
				color: #000;
			}
		}
	}

	&__counter {
		margin-left: auto;
		margin-right: 10px;
	}

	&__total {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		padding: 20px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		&-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}

		&-text {
			font-size: 1.5rem;
			font-weight: 700;
			letter-spacing: 0.1rem;
		}

		&-price {
			font-size: 1.5rem;
			font-weight: 700;
		}

		&-submit {
			display: block;
			width: 100%;
			background-color: #040a22;
			color: #fff;
			border: none;
			padding: 10px 0;
			cursor: pointer;

			&:hover {
				background-color: #040a22de;
			}
		}
	}

	&__empty {
		padding: 0 10px;

		&-img {
			max-width: 100%;
		}
	}
}
</style>