<template>
	<div class="cart">
		<header class="cart__header">
			<h1 class="cart__title title">Cart</h1>

			<a
				href="/"
				class="product__back btn-back"
				@click.prevent="$router.go(-1)"
			>
				<span class="material-icons"> keyboard_backspace </span>
			</a>
		</header>

		<CartList />

		<div class="cart__total" v-if="!isCartEmpty">
			<div class="cart__total-row">
				<span class="cart__total-text">Total</span>
				<span class="cart__total-price">$ {{ totalPrice | toFixed }}</span>
			</div>

			<button
				type="button"
				class="cart__total-submit btn-confirm"
				@click="$modal.show('order')"
			>
				To order
			</button>
		</div>

		<div class="cart__empty" v-if="isCartEmpty">
			<img
				:src="require('@/assets/emptyCart.png')"
				alt="Empty cart"
				class="cart__empty-img"
			/>
		</div>

		<CartModalOrder @confirmOrder="confirmOrder" />

		<notifications position="center">
			<template slot="body">
				<p class="notification">
					Thanks for your order
					<span class="notification__name">{{ name }}</span>
				</p>
			</template>
		</notifications>
	</div>
</template>

<script>
import CartList from '../components/CartList';
import CartModalOrder from '../components/CartModalOrder';

export default {
	name: 'Cart',
	components: { CartList, CartModalOrder },

	data() {
		return {
			name: null,
		};
	},

	computed: {
		totalPrice() {
			return this.$store.getters.TotalPrice;
		},

		isCartEmpty() {
			return this.$store.getters.isCartEmpty;
		},
	},

	methods: {
		confirmOrder(name) {
			this.name = name;
		},
	},

	mounted() {
		this.$modal.hide('order');
	},
};
</script>

<style lang="scss">
.cart {
	padding-bottom: 140px;
	flex-grow: 1;
	padding-top: 20px;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px 0 15px;
		margin-bottom: 20px;
	}

	&__title {
		margin: 0;
		font-size: 1.7rem;
	}

	&__total {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		padding: 20px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		@media (min-width: 768px) {
			left: 50%;
			transform: translateX(-50%);
			max-width: 1100px;
		}

		&-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}

		&-text {
			font-size: 1.5rem;
			font-weight: 700;
			letter-spacing: 0.1rem;
		}

		&-price {
			font-size: 1.5rem;
			font-weight: 700;
		}
	}

	&__empty {
		padding: 0 10px;
		display: flex;
		justify-content: center;

		&-img {
			max-width: 100%;
		}
	}

	&__modal {
		display: flex;
		height: auto;
		right: 0;
		bottom: 0;

		&-title {
			display: block;
			text-align: center;
			margin-bottom: 20px;
			font-weight: 700;
			font-size: 1.3rem;
		}

		& .vm--modal {
			top: auto !important;
			height: auto !important;
			border-radius: 0;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
			overflow: visible;
			padding: 50px 15px 15px;
			margin-top: auto;
		}

		&-img-wrapper {
			position: absolute;
			top: -25px;
			left: 50%;
			transform: translateX(-50%);
			width: 50px;
			height: 50px;
			padding: 3px;
			border: 5px solid #fff;
			background-color: rgb(223, 246, 238);
			border-radius: 50%;
		}

		&-logo {
			max-width: 100%;
			object-fit: cover;
		}
	}

	&__order {
		display: flex;
		flex-direction: column;

		&-input {
			padding: 10px;
			background-color: rgba(34, 34, 34, 0.05);
			border: 1px solid rgba(34, 34, 34, 0.05);
			border-radius: 5px;
			margin-bottom: 15px;

			&:last-of-type {
				margin-bottom: 30px;
			}

			&::placeholder {
				font-weight: 400;
			}

			&:focus {
				background-color: #fff;
				outline: none;
			}

			&.invalid {
				border-color: rgb(233, 51, 51);
			}
		}

		&-helper {
			opacity: 0;
			font-size: 0.8rem;
			color: rgb(233, 51, 51);
			margin-bottom: 3px;
			transition: opacity 0.2s;

			&.error {
				opacity: 1;
			}
		}

		&-pay {
			margin-bottom: 15px;
		}

		&-cash {
			background-color: #07440a;

			&:hover {
				background-color: #07440ad0;
			}
		}
	}
}

.notification {
	display: flex;
	align-items: center;
	padding: 10px;
	margin: 0 5px 5px;
	background: #68cd86;
	border-left: 5px solid #42a85f;
	min-height: 50px;
	color: #ffffff;

	&__name {
		display: inline-block;
		margin-left: 5px;
		font-weight: 700;
	}
}
</style>