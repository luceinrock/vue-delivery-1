<template>
	<div class="counter">
		<button class="counter__btn" @click="$emit('decrement')">−</button>
		<span class="counter__number">
			<slot></slot>
		</span>
		<button class="counter__btn" @click="$emit('increment')">+</button>
	</div>
</template>

<script>
export default {
	name: 'Counter',
};
</script>

<style lang="scss">
.counter {
	display: flex;
	align-items: center;

	&__btn {
		padding: 0;
		width: 25px;
		height: 25px;
		border: none;
		border-radius: 5px;
		background-color: #f7f7f7;
		cursor: pointer;

		&:hover {
			background-color: #ffd45b;
		}

		&:active {
			background-color: #ffd35b96;
		}
	}

	&__number {
		margin: 0 10px;
	}
}
</style>