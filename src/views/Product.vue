<template>
	<div class="product">
		<h1 class="product__title">{{ product.title }}</h1>

		<div class="product__img-wrapper">
			<img
				:src="product.image"
				:alt="`${product.title} ${product.category}`"
				class="product__img"
			/>
		</div>

		<p class="product__description">
			{{ product.description }}
		</p>

		<p class="product__price">${{ product.price[0] | toFixed }}</p>

		<div class="product__sizes" v-if="product.price.length > 1">
			<input
				class="product__size-pick"
				type="radio"
				id="s"
				:value="product.price[0]"
				v-model="picked"
			/>
			<label for="s">S</label>

			<input
				class="product__size-pick"
				type="radio"
				id="m"
				:value="product.price[1]"
				v-model="picked"
			/>
			<label for="m">M</label>

			<input
				class="product__size-pick"
				type="radio"
				id="l"
				:value="product.price[2]"
				v-model="picked"
			/>
			<label for="l">L</label>
		</div>

		<Counter
			class="product__counter"
			sizeM
			@increment="counter++"
			@decrement="counterDecrement()"
		>
			{{ counter }}
		</Counter>

		<cart-button class="product__add" @click="addToCart(product)"
			>Add to cart</cart-button
		>
	</div>
</template>

<script>
import Counter from '../components/Counter';
import CartButton from '../components/CartButton';

export default {
	name: 'Product',
	props: ['code'],

	data() {
		return {
			counter: 1,
			picked: this.$store.getters.productBaseCost(this.code),
		};
	},

	computed: {
		product() {
			return this.$store.getters.product(this.code);
		},
	},

	methods: {
		counterDecrement() {
			if (this.counter === 1) return;
			this.counter--;
		},

		addToCart(product) {
			product = { ...product, price: this.picked, amount: this.counter };
			this.$store.dispatch('addProduct', product);
		},
	},

	components: {
		Counter,
		CartButton,
	},
};
</script>

<style lang="scss">
.product {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
	padding: 40px 10px;
	background-color: #fff;

	&__title {
		text-align: center;
		font-size: 1.5rem;
		max-width: 70%;
	}

	&__img-wrapper {
		display: flex;
		justify-content: center;
		width: 80%;
	}

	&__img {
		max-width: 100%;
		object-fit: cover;
	}

	&__description {
		max-width: 70%;
		text-align: center;
		color: rgb(134, 134, 134);
		margin-bottom: 8px;
	}

	&__price {
		margin-top: 0;
		font-weight: 700;
		font-size: 1.3rem;
	}

	&__sizes {
		display: flex;
		margin-bottom: 20px;
	}

	&__size-pick {
		display: none;

		& + label {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			background-color: #f6f6f6;
			color: #8f8d8e;
			font-weight: 700;
			border-radius: 10px;
			cursor: pointer;

			&:hover {
				background-color: #e7e7e7;
			}

			&:not(:last-child) {
				margin-right: 10px;
			}
		}

		&:checked + label {
			background-color: #ffd45b;
			color: #000;
			cursor: default;
		}
	}

	&__counter {
		margin-bottom: 80px;
	}

	&__add {
		visibility: visible;
	}
}
</style>