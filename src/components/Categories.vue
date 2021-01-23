<template>
	<div class="horizontal-scroll">
		<scrollactive
			class="categories"
			active-class="active"
			tag="ul"
			:offset="70"
			@itemchanged="onItemChanged"
		>
			<li
				class="categories__item"
				v-for="category in categories"
				:key="category.title"
			>
				<a
					:href="'#' + category.title"
					class="categories__item-link scrollactive-item"
				>
					<img
						:src="category.icon"
						:alt="'Icon ' + category.title"
						class="categories__icon"
						width="64px"
						height="64px"
					/>

					<span>{{ category.title | capitalize }}</span>
				</a>
			</li>
		</scrollactive>
	</div>
</template>

<script>
export default {
	name: 'Categories',
	data: () => ({
		categories: [
			{
				title: 'pizza',
				icon: require('@/assets/categoriesIcons/pizza.png'),
			},
			{
				title: 'burgers',
				icon: require('@/assets/categoriesIcons/burger.png'),
			},
			{
				title: 'drinks',
				icon: require('@/assets/categoriesIcons/drinks.png'),
			},
			{
				title: 'desserts',
				icon: require('@/assets/categoriesIcons/dessert.png'),
			},
		],
	}),

	methods: {
		onItemChanged(event, currentItem) {
			if (currentItem && this.$route.hash !== currentItem.hash) {
				this.$router.replace(currentItem.hash);
			}
		},
	},
};
</script>

<style lang="scss">
.horizontal-scroll {
	position: sticky;
	top: 0;
	top: 5px;
	overflow: auto;
	margin: 0 10px 30px 10px;
	background-color: #ffd45b;
	border-radius: 10px;
	z-index: 100;
}

.categories {
	margin: 0;
	padding: 5px;
	list-style: none;
	display: flex;
	justify-content: space-between;
	min-width: fit-content;

	&__item {
		margin-right: 10px;
		cursor: pointer;

		&:last-child {
			margin-right: 0;
		}

		&-link {
			display: flex;
			flex-direction: column;
			align-items: center;
			min-width: 60px;
			padding: 5px;
			border-radius: 5px;
			color: inherit;
			text-decoration: none;
			font-size: 0.7rem;
			font-weight: 700;

			&:hover {
				background-color: rgba(0, 0, 0, 0.061);
			}

			&.active {
				background-color: #ffda73;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.198);
			}
		}
	}

	&__icon {
		width: 25px;
		height: 25px;
		margin-bottom: 5px;
	}
}
</style>