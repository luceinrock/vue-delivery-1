<template>
	<div class="horizontal-scroll">
		<ul class="categories">
			<li
				class="categories__item"
				v-for="category in categories"
				:key="category.title"
			>
				<img
					:src="category.icon"
					:alt="'Vue delivery ' + category.title"
					class="categories__icon"
					width="64px"
					height="64px"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Categories',
	data: () => ({
		categories: [
			{
				title: 'all',
				icon: require('@/assets/categoriesIcons/all.png'),
			},
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
};
</script>

<style lang="scss">
.horizontal-scroll {
	overflow: auto;
	margin: 0 10px;
	background-color: #ffd45b;
	border-radius: 10px;
}

.categories {
	margin: 0;
	padding: 5px 20px;
	list-style: none;
	display: flex;
  justify-content: space-between;
  min-width: fit-content;

	&__item {
		margin-right: 15px;
		padding: 5px;
		border-radius: 5px;

		&:last-child {
			margin-right: 0;
		}

		&.active {
      background-color: #ffda73;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.198);
		}
	}

	&__icon {
		width: 30px;
		height: 30px;
	}
}
</style>