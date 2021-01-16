<template>
	<div id="app">
		<div class="delivery">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html {
	font-family: Roboto, sans-serif;
	font-size: 18px;
	height: 100%;
}

body {
	color: #202020;
}

body,
#app,
.delivery {
	height: 100%;
	background-color: #fff;
	overflow: hidden;
}
</style>
