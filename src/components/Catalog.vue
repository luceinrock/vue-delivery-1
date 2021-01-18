<template>
	<div class="products">
		<ul class="products__list">
			<li class="products__item" v-for="item in products" :key="item.title">
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
							FROM {{ item.price[0].cost }} $
						</span>
					</div>
				</div>
			</li>
		</ul>
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

		&-wrapper {
			padding-top: 10px;
			margin-bottom: 20px;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			min-height: 260px;
			box-shadow: 0 3px 10px #e0dfdf;
		}

		&-info {
			display: flex;
			flex-direction: column;
			align-self: flex-start;
			flex: 1 1 auto;
			padding: 10px 10px 20px 10px;
			width: 100%;
			box-sizing: border-box;
			border-radius: 5px;
		}

		&-title {
			font-weight: 700;
			margin-bottom: 5px;
		}

		&-description {
			display: inline-block;
			color: #828282;
			font-size: 0.6rem;
			margin-bottom: 5px;
		}

		&-price {
			font-weight: 700;
			margin-top: auto;
		}
	}

	&__img {
		width: 120px;
		height: 120px;
	}
}
</style>