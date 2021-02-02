<template>
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
				:class="{ invalid: $v.email.$error }"
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

			<button type="submit" class="btn-confirm cart__order-pay">Pay now</button>

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
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
const phoneUA = (value) => value.match(/^((\+?3)?8)?0\d{9}$/) != null;

export default {
	name: 'CartModalOrder',

	data() {
		return {
			email: '',
			name: '',
			address: '',
			phone: '',
		};
	},

	methods: {
		onSubmit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.$modal.hide('order');
				this.$store.dispatch('removeCart');
				this.$notify('');
			}

			this.$emit('confirmOrder', this.name);
		},
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

<style>
</style>