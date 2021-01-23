<template>
	<div class="home" ref="home">
		<header class="delivery__header">
			<img
				src="../assets/logo.png"
				alt="vue deliver logo"
				class="delivery__logo"
				width="50"
				height="50"
			/>

			<h1 class="delivery__title title">Vue delivery</h1>
		</header>

		<Categories />

		<Catalog />

		<cart-button
			class="delivery__add-to-cart"
			:class="{ active: cartLength }"
			@click="goToCart"
		>
			{{ cartLength }} items
		</cart-button>
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
		cartLength() {
			return this.$store.getters.getCartLength;
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
.delivery {
	&__logo {
		display: inline-block;
		padding: 5px;
		border-radius: 10px;
		background-color: #ffd45b;
		margin-right: 10px;
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
		transform: translateX(-50%);
	}
}
</style>