<template>
	<div class="cart">
		<h1 class="cart__title title">Cart</h1>

		<ul class="cart__list">
			<li class="cart__item" v-for="(item, index) in cartList" :key="index">
				<img :src="item.image" :alt="item.title" class="cart__item-img" />

				<div class="cart__item-info">
					<span class="cart__item-title">
						{{ item.title }}
					</span>

					<span class="cart__item-total-cost">
						$ {{ (item.price * item.amount).toFixed(2) }}
					</span>
				</div>

				<Counter
					class="cart__counter"
					@increment="addOne(index)"
					@decrement="decreaseOne(index)"
					>{{ item.amount }}</Counter
				>
			</li>
		</ul>
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
	},

	methods: {
		addOne(index) {
			this.$store.dispatch('addToQuantity', index);
		},
		decreaseOne(index) {
			this.$store.dispatch('subtractFromQuantity', index);
		},
	},
};
</script>

<style lang="scss">
.cart {
	padding: 0 10px;

	&__title {
		margin-top: 10px;
		margin-bottom: 20px;
		font-size: 1.7rem;
	}

	&__list {
		margin: 0;
		padding: 0;
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
	}

	&__counter {
		margin-left: auto;
	}
}
</style>