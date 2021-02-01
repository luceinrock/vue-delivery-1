<template>
	<div id="app">
		<transition
			:name="transitionName"
			mode="out-in"
			@after-leave="$root.$emit('triggerScroll')"
		>
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			transitionName: null,
		};
	},

	created() {
		this.$store.dispatch('setCart');
	},

	watch: {
		$route(to, from) {
			const toDepth = to.path.split('/').length;
			const fromDepth = from.path.split('/').length;
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
		},
	},
};
</script>

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

[v-cloak] {
	display: none;
}

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
	max-width: 1100px;
	margin: 0 auto;
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

.btn-back {
	display: inline-flex;
	padding: 2px;
	text-decoration: none;
	color: #000;
	background-color: #ffd45b;
	border-radius: 50%;
	flex-shrink: 0;

	&:hover {
		background-color: #f1c857;
	}

	& > span {
		font-size: 1.8rem;
	}
}

.btn-confirm {
	display: block;
	width: 100%;
	background-color: #040a22;
	color: #fff;
	border: none;
	padding: 10px 0;
	cursor: pointer;

	&:hover {
		background-color: #040a22de;
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

.slide-right-enter-active {
	transition: all 0.3s;
}

.slide-right-enter {
	transform: translate(-100%);
}

.slide-left-enter-active {
	transition: all 0.3s;
}

.slide-left-enter {
	transform: translate(100%);
}
</style>
