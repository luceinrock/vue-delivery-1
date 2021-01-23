<template>
	<div id="app">
		<div class="delivery">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.$store.dispatch('GET_PRODUCTS');
	},
};
</script>

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html {
	font-family: Roboto, sans-serif;
	font-size: 18px;
}

body {
	color: #202020;
}

body,
#app,
.delivery {
	background-color: #f4f8ff;
}

.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
}

.btn-bag {
	display: flex;
	background-color: #ffd45b;
	width: 35px;
	height: 35px;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	border: none;
	cursor: pointer;

	& > .material-icons {
		pointer-events: none;
	}
}

.title {
	margin: 0;
	font-size: 1.3rem;
}
</style>
