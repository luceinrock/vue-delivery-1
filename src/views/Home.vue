<template>
	<div class="home">
		<header class="delivery__header">
			<img
				src="../assets/logo.png"
				alt="vue deliver logo"
				class="delivery__logo"
				width="50"
				height="50"
			/>

			<h1 class="delivery__title">Vue delivery</h1>
		</header>

		<Categories />

		<router-view></router-view>
	</div>
</template>

<script>
import Categories from '../components/Categories';

export default {
	name: 'home',
	components: {
		Categories,
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

	&__title {
		margin: 0;
		font-size: 1.3rem;
	}
}
</style>