<template>
	<div class="products">
		<section
			class="product"
			v-for="(product, key) in products"
			:key="key"
			:id="key"
		>
			<h2 class="product__title">{{ key | capitalize }}</h2>

			<ul class="products__list">
				<li
					class="products__item"
					v-for="item in products[key]"
					:key="item.title"
				>
					<div class="products__item-wrapper">
						<img
							:src="item.image"
							:alt="item.title"
							class="products__img"
							width="233"
							height="233"
						/>

						<div class="products__item-info">
							<span class="products__item-title">
								{{ item.title }}
							</span>

							<span class="products__item-description">
								{{ item.description }}
							</span>

							<span class="products__item-price">
								{{
									item.price.length > 1
										? `FROM ${item.price[0]}`
										: `${item.price[0]}`
								}}
								$
							</span>
						</div>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Catalog',
	computed: {
		products() {
			return this.$store.state.products;
		},
	},
};
</script>

<style lang="scss">
.product {
	padding-top: 20px;

	&__title {
		margin: 0 0 20px 10px;
	}
}

.products {
	width: 100%;
	box-sizing: border-box;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	&__item {
		flex: 0 1 50%;
		padding: 10px;
		box-sizing: border-box;
		display: flex;

		&-wrapper {
			padding-top: 10px;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			box-shadow: 0 3px 10px #e0dfdf;
			background-color: #fff;
			flex-grow: 1;
		}

		&-info {
			display: flex;
			flex-direction: column;
			align-self: flex-start;
			flex: 1 1 auto;
			padding: 10px 10px 15px 10px;
			width: 100%;
			box-sizing: border-box;
			border-radius: 5px;
		}

		&-title {
			font-weight: 700;
			margin-bottom: 5px;
		}

		&-description {
			position: relative;
			display: inline-block;
			height: 2rem;
			margin-bottom: 10px;
			color: #919191;
			font-size: 0.6rem;
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background-image: linear-gradient(to top, #fff, transparent 10px);
			}
		}

		&-price {
			margin-top: auto;
			font-weight: 700;
			font-size: 0.9rem;
			color: #ffd45b;
		}
	}

	&__img {
		width: 120px;
		height: 120px;
	}
}
</style>