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

		<ul class="cart__list" v-if="!isCartEmpty">
			<li class="cart__item" v-for="(item, index) in cartList" :key="index">
				<img :src="item.image" :alt="item.title" class="cart__item-img" />

				<div class="cart__item-info">
					<span class="cart__item-title">
						{{ item.title }}
					</span>

					<span class="cart__item-total-cost">
						$ {{ (item.cost * item.amount) | toFixed }}
					</span>

					<span class="cart__item-size">
						{{ item.size | capitalize }}
					</span>
				</div>

				<Counter
					class="cart__counter"
					@increment="addOne(index)"
					@decrement="decreaseOne(index)"
					>{{ item.amount }}
				</Counter>

				<button class="cart__item-delete" @click="deleteItemInCart(index)">
					<span class="material-icons"> clear </span>
				</button>
			</li>
		</ul>

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

		<modal name="order" class="cart__modal" adaptive>
			<span class="cart__modal-title">Enter your details</span>

			<form class="cart__order" @submit.prevent="onSubmit">
				<span
					class="cart__order-helper"
					:class="{
						error: $v.email.$dirty && $v.email.$error,
					}"
				>
					{{
						!$v.email.required
							? 'This is a required field'
							: 'Enter a valid Email'
					}}
				</span>
				<input
					type="email"
					placeholder="Email"
					class="cart__order-input"
					v-model.trim="email"
				/>

				<span
					class="cart__order-helper"
					:class="{ error: $v.name.$dirty && $v.name.$error }"
				>
					This is a required field
				</span>
				<input
					type="text"
					placeholder="Name"
					class="cart__order-input"
					:class="{ invalid: $v.name.$error }"
					v-model.trim="name"
				/>

				<span
					class="cart__order-helper"
					:class="{
						error: $v.address.$dirty && $v.address.$error,
					}"
				>
					This is a required field
				</span>
				<input
					type="text"
					placeholder="Address"
					class="cart__order-input"
					v-model.trim="address"
					:class="{ invalid: $v.address.$error }"
				/>

				<span
					class="cart__order-helper"
					:class="{
						error: $v.phone.$dirty && $v.phone.$error,
					}"
				>
					{{
						!$v.phone.required
							? 'This is a required field'
							: 'Enter a valid number (+380 000 000 000)'
					}}
				</span>
				<input
					type="text"
					placeholder="Phone"
					class="cart__order-input"
					v-model.trim="phone"
					:class="{ invalid: $v.phone.$error }"
				/>

				<button type="submit" class="btn-confirm cart__order-pay">
					Pay now
				</button>

				<button type="submit" class="btn-confirm cart__order-cash">
					Pay in cash
				</button>
			</form>

			<div class="cart__modal-img-wrapper">
				<img
					:src="require('@/assets/logo.png')"
					alt="vue delivery logo"
					class="cart__modal-logo"
				/>
			</div>
		</modal>

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
import Counter from '../components/Counter';
import { required, email } from 'vuelidate/lib/validators';
const phoneUA = (value) => value.match(/^((\+?3)?8)?0\d{9}$/) != null;

export default {
	name: 'Cart',
	components: { Counter },
	data() {
		return {
			email: '',
			name: '',
			address: '',
			phone: '',
		};
	},

	computed: {
		cartList() {
			return this.$store.getters.getCartList;
		},

		totalPrice() {
			return this.$store.getters.TotalPrice;
		},

		isCartEmpty() {
			return this.$store.getters.isCartEmpty;
		},
	},

	methods: {
		addOne(index) {
			this.$store.dispatch('addToQuantity', { index, amount: 1 });
		},

		decreaseOne(index) {
			this.$store.dispatch('subtractFromQuantity', index);
		},

		deleteItemInCart(index) {
			this.$store.commit('deleteFromCart', index);
		},

		onSubmit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.$modal.hide('order');
				this.$store.dispatch('removeCart')
				this.$notify('');
			}
		},
	},

	mounted() {
		this.$modal.hide('order');
	},

	validations: {
		email: {
			required,
			email,
		},

		name: {
			required,
		},

		address: {
			required,
		},

		phone: {
			required,
			phone: phoneUA,
		},
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

	&__list {
		margin: 0;
		padding: 0 10px;
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	&__item {
		display: flex;
		align-items: center;
		padding: 5px 10px 5px 5px;
		background-color: #fff;
		margin-bottom: 10px;
		border-radius: 10px;

		&-img {
			width: 80px;
			height: 80px;
			margin-right: 10px;
		}

		&-info {
			display: flex;
			flex-direction: column;
			font-size: 0.8rem;
			max-width: 30%;
		}

		&-total-cost {
			font-weight: 700;
		}

		&-size {
			color: rgb(163, 163, 163);
		}

		&-delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			background: none;
			border: none;
			color: rgb(163, 163, 163);
			cursor: pointer;

			&:hover {
				color: #000;
			}
		}
	}

	&__counter {
		margin-left: auto;
		margin-right: 10px;
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

		&-img {
			max-width: 100%;
		}
	}

	&__modal {
		display: flex;

		&-title {
			display: block;
			text-align: center;
			margin-bottom: 20px;
			font-weight: 700;
			font-size: 1.3rem;
		}

		& .vm--modal {
			position: absolute;
			bottom: 0;
			top: auto !important;
			height: auto !important;
			border-radius: 0;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
			overflow: visible;
			padding: 50px 15px 15px;
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
	padding: 10px;
	margin: 0 5px 5px;
	background: #68cd86;
	border-left: 5px solid #42a85f;
	min-height: 50px;
	color: #ffffff;

	&__name {
		font-weight: 700;
	}
}
</style>