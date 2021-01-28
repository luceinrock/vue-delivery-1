<template>
	<section class="product">
		<template>
			<header class="product__header">
				<a
					href="/"
					class="product__back btn-back"
					@click.prevent="$router.go(-1)"
				>
					<span class="material-icons"> keyboard_backspace </span>
				</a>

				<router-link to="/cart" class="btn-bag product__to-cart">
					<span class="material-icons material-icons-outlined">
						shopping_bag
					</span>

					<span class="product__cart-length" v-show="cartLength">{{
						cartLength
					}}</span>
				</router-link>
			</header>

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

			<p class="product__price">${{ picked.cost | toFixed }}</p>

			<div class="product__sizes">
				<template v-for="(meta, i) in product.meta">
					<input
						class="product__size-pick"
						type="radio"
						:id="meta.size"
						:value="meta"
						v-model="picked"
						:key="meta.size"
					/>
					<label :for="meta.size" :key="meta.size + i">{{ meta.size }}</label>
				</template>
			</div>

			<Counter
				class="product__counter"
				sizeM
				@increment="counter++"
				@decrement="counterDecrement()"
			>
				{{ counter }}
			</Counter>

			<cart-button class="product__add" @click="addToCart(product)">
				Add to cart
			</cart-button>
		</template>
	</section>
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
			picked: null,
		};
	},

	computed: {
		product() {
			return this.$store.getters.product(this.code);
		},

		cartLength() {
			return this.$store.getters.cartLength;
		},
	},

	methods: {
		counterDecrement() {
			if (this.counter === 1) return;
			this.counter--;
		},

		addToCart(product) {
			product = {
				...product,
				size: this.picked.size,
				cost: this.picked.cost,
				amount: this.counter,
			};

			this.$store.dispatch('addProduct', product);
			this.counter = 1;
		},
	},

	created() {
		this.picked = this.$store.getters.productDefaultSize(this.code);
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
	padding: 20px 10px;
	background-color: #fff;

	&__header {
		align-self: stretch;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__to-cart {
		position: relative;
		color: #000;
		font-size: 0.8rem;
		text-decoration: none;

		&:hover {
			background-color: #f1c857;
		}
	}

	&__cart-length {
		position: absolute;
		bottom: -10px;
		left: -10px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: 3px solid #fff;
		color: #fff;
		min-width: 27px;
		min-height: 27px;
		background-color: rgb(243, 63, 63);
	}

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
			box-sizing: border-box;
			min-width: 40px;
			min-height: 40px;
			padding: 0 5px;
			background-color: #f6f6f6;
			color: #8f8d8e;
			font-weight: 700;
			text-transform: uppercase;
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
		margin-bottom: 20px;
	}

	&__add {
		margin-top: auto;

		&:hover {
			transform: translateY(-3px);
		}
	}
}
</style>