<template>
	<li class="products__item">
		<router-link
			tag="div"
			:to="'product/' + item.code"
			class="products__item-wrapper"
		>
			<img
				:src="item.image"
				:alt="item.title"
				class="products__item-img"
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

				<div class="products__item-row">
					<span class="products__item-price">
						{{
							item.meta.length > 1
								? `FROM ${item.meta[0].cost}`
								: `${item.meta[0].cost}`
						}}
						$
					</span>

					<button
						class="products__item-buy btn-bag"
						@click.stop="addToCart(item)"
					>
						<span class="material-icons material-icons-outlined">
							shopping_bag
						</span>
					</button>
				</div>
			</div>
		</router-link>
	</li>
</template>

<script>
export default {
	name: 'ProductsItem',
	props: ['item'],
	methods: {
		addToCart(item) {
			const product = {
				...item,
				cost: item.meta[0].cost,
				size: item.meta[0].size,
				amount: 1,
			};
			this.$store.dispatch('addProduct', product);
		},
	},
};
</script>

<style lang="scss">
.products__item {
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
		transition: transform 0.2s;
		cursor: pointer;

		&:hover {
			transform: translateY(-3px);
		}
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

	&-img {
		width: 120px;
		height: 120px;
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

	&-row {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&-price {
		font-weight: 700;
		font-size: 0.8rem;
		color: #ffaa5b;
	}

	&-buy:hover {
		background-color: #f1c855;
	}
}
</style>