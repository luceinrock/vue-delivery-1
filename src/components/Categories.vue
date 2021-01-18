<template>
	<div class="horizontal-scroll">
		<ul class="categories">
			<router-link
				class="categories__item"
				v-for="(category, index) in categories"
				:key="category.title"
				tag="li"
				exact
				:to="index > 0 ? '/categories/' + category.title : '/'"
				active-class="active"
				@click.native="goToCategory($event)"
			>
				<img
					:src="category.icon"
					:alt="'Vue delivery ' + category.title"
					class="categories__icon"
					width="64px"
					height="64px"
				/>

				<a
					:href="index > 0 ? '/categories/' + category.title : '/'"
					class="categories__item-link"
				>
					{{ category.title | capitalize }}
				</a>
			</router-link>
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

	methods: {
		goToCategory(e) {
			const item = e.target.closest('li');
			const link = item
				.querySelector('.categories__item-link')
				.href.split('/')
				.splice(3);

			const path = '/' + link.join('/');

			if (this.$route.path !== path) {
				this.$router.push({
					name: 'category',
					params: { categoryName: link[1] },
				});
			}
		},
	},

	filters: {
		capitalize: function (value) {
			if (!value) return '';
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
	},
};
</script>

<style lang="scss">
.horizontal-scroll {
	overflow: auto;
	margin: 0 10px 30px 10px;
	background-color: #ffd45b;
	border-radius: 10px;
}

.categories {
	margin: 0;
	padding: 5px;
	list-style: none;
	display: flex;
	justify-content: space-between;
	min-width: fit-content;

	&__item {
		display: flex;
		flex-direction: column;
		min-width: 60px;
		align-items: center;
		margin-right: 10px;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;

		&:last-child {
			margin-right: 0;
		}

		&:hover {
			background-color: rgba(0, 0, 0, 0.061);
		}

		&.active {
			background-color: #ffda73;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.198);
		}

		&-link {
			color: inherit;
			text-decoration: none;
			font-size: 0.7rem;
			font-weight: 700;
		}
	}

	&__icon {
		width: 25px;
		height: 25px;
		margin-bottom: 5px;
	}
}
</style>