<template>
	<div class="add-to-cart" @click="$emit('click')">
		<div class="btn-bag add-to-cart__bag">
			<span class="material-icons material-icons-outlined"> shopping_bag </span>
		</div>

		<span class="add-to-cart__text">
			<slot></slot>
		</span>
	</div>
</template>

<script>
export default {
	name: 'CartButton',
};
</script>

<style lang="scss">
.add-to-cart {
	display: inline-flex;
	align-items: center;
	background-color: #000;
	padding: 5px 10px 5px 5px;
	border-radius: 10px;
	box-shadow: 0 10px 20px -3px rgb(102, 102, 102);
	visibility: hidden;
	cursor: pointer;

	&.active {
		visibility: visible;
	}

	&__bag {
		margin-right: 10px;
	}

	&__text {
		color: #fff;
		font-size: 0.8rem;
	}
}
</style>