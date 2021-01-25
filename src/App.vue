<template>
	<div id="app">
		<router-view></router-view>
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
	min-height: 100%;
	display: flex;
}

body {
	display: flex;
	flex-grow: 1;
	color: #202020;
}

#app {
	display: flex;
	flex-grow: 1;
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
	position: relative;
	margin: 0;
	margin-left: 5px;
	display: inline-block;
	font-size: 1.3rem;

	&::before {
		position: absolute;
		content: '';
		left: -5px;
		display: block;
		height: 100%;
		width: 5px;
		background-color: #ffd45b;
	}
}
</style>
