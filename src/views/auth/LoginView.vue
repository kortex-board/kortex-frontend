<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useToast } from "vue-toastification";
	import { login as loginService } from "@/services/authService";

	const email = ref("");
	const password = ref("");
	const router = useRouter();
	const toast = useToast();

	const login = async () => {
		try {
			await loginService({ email: email.value, password: password.value });
			toast.success("Logged in successfully");
			router.push("/boards");
		} catch (error) {
			toast.error("Failed to login");
		}
	};
</script>

<template>
	<div class="centered-container">
		<div class="login-container">
			<h1>Login</h1>
			<form @submit.prevent="login">
				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="email"
						type="email"
						required
					/>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input
						id="password"
						v-model="password"
						type="password"
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account?
				<RouterLink to="/register">Register here</RouterLink>
			</p>
		</div>
	</div>
</template>

<style scoped>
	.login-container {
		max-width: 400px;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		width: 100%;
		padding: 0.5rem;
		color: white;
		cursor: pointer;
		background-color: #007bff;
		border: none;
		border-radius: 4px;
	}

	button:hover {
		background-color: #0056b3;
	}

	p {
		margin-top: 1rem;
		text-align: center;
	}
</style>
