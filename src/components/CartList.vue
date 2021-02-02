<template>
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
</template>

<script>
import Counter from './Counter';
export default {
	name: 'CartList',
	components: { Counter },

	computed: {
		cartList() {
			return this.$store.getters.getCartList;
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
			this.$store.dispatch('deleteFromCart', index);
		},
	},
};
</script>

<style lang="scss">
.cart {
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
}
</style>