<template>
	<div class="home">
		<header class="home__header">
			<img
				src="../assets/logo.png"
				alt="vue deliver logo"
				class="home__logo"
				width="50"
				height="50"
			/>

			<h1 class="home__title">Vue delivery</h1>
		</header>

		<Categories />

		<Catalog />

		<transition name="fadeBottom">
			<cart-button
				class="home__add-to-cart"
				@click="goToCart"
				v-show="cartLength"
			>
				{{ cartLength }} items
			</cart-button>
		</transition>
	</div>
</template>

<script>
import Categories from '../components/Categories';
import Catalog from '../components/Catalog';
import CartButton from '../components/CartButton';

export default {
	name: 'home',
	components: {
		Categories,
		Catalog,
		CartButton,
	},

	computed: {
		isCartEmpty() {
			return this.$store.getters.isCartEmpty;
		},

		cartLength() {
			return this.$store.getters.cartLength;
		},
	},

	methods: {
		goToCart() {
			this.$router.push('/cart');
		},
	},
};
</script>

<style lang="scss">
.home {
	background-color: #f4f8ff;

	&__logo {
		display: inline-block;
		padding: 5px;
		border-radius: 10px;
		background-color: #ffd45b;
		margin-right: 10px;
	}

	&__title {
		margin: 0;
		font-size: 1.3rem;
	}

	&__header {
		display: flex;
		align-items: center;
		padding: 10px;
		margin-bottom: 20px;
	}

	&__add-to-cart {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translate(-50%, 0);
	}
}

.fadeBottom-enter-active {
	transition: all 0.4s;
}
.fadeBottom-enter {
	opacity: 0;
	transform: translate(-50%, 200%);
}
</style>