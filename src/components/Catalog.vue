<template>
	<div class="products">
		<section
			class="products__wrapper"
			v-for="(product, key) in products"
			:key="key"
			:id="key"
		>
			<h2 class="products__title title">{{ key | capitalize }}</h2>

			<ul class="products__list">
				<ProductsItem v-for="item in product" :key="item.title" :item="item" />
			</ul>
		</section>
	</div>
</template>

<script>
import ProductsItem from './ProductsItem';

export default {
	name: 'Catalog',
	components: { ProductsItem },
	computed: {
		products() {
			return this.$store.state.products;
		},
	},
};
</script>

<style lang="scss">
.products {
	width: 100%;
	box-sizing: border-box;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;

	&__wrapper {
		padding-top: 20px;
		margin-bottom: 50px;
	}

	&__title {
		margin: 0 0 20px 15px;
		font-size: 1.5rem;
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
	}
}
</style>