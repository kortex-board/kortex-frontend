<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { RouterView, useRouter } from "vue-router";
	import { useAuthStore } from "./stores/auth";

	const authStore = useAuthStore();
	const { token } = storeToRefs(authStore);
	const router = useRouter();

	const logout = () => {
		authStore.logout();
		router.push("/login");
	};
</script>

<template>
	<header v-if="token">
		<nav>
			<button @click="logout">Logout</button>
		</nav>
	</header>
	<RouterView />
</template>

<style scoped>
	header {
		display: flex;
		justify-content: flex-end;
		padding: 1rem;
		background-color: #f8f9fa;
	}
</style>

