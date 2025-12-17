<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

const logout = () => {
	authStore.logout();
	router.push({name: 'login'});
};
</script>

<template>
	<header class="app-header">
		<div class="logo">
			<router-link to="/boards">Kortex</router-link>
		</div>
		<nav class="navigation">
			<div v-if="user" class="user-menu">
				<span>Welcome, {{ user.name }}</span>
				<button @click="logout" class="logout-button">Logout</button>
			</div>
		</nav>
	</header>
</template>

<style scoped>
.app-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 2rem;
	background-color: #ffffff;
	border-bottom: 1px solid #e0e0e0;
}

.logo a {
	font-size: 1.5rem;
	font-weight: bold;
	color: #333;
	text-decoration: none;
}

.navigation .user-menu {
	display: flex;
	gap: 1rem;
	align-items: center;
}

.user-menu span {
	font-size: 1rem;
	color: #555;
}

.logout-button {
	padding: 0.5rem 1rem;
	font-size: 1rem;
	color: #ffffff;
	cursor: pointer;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.logout-button:hover {
	background-color: #0056b3;
}
</style>
