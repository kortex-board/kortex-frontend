<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { onMounted } from "vue";
	import { RouterView } from "vue-router";
	import Header from "@/components/Header.vue";
	import { getMe } from "@/services/authService";
	import { useAuthStore } from "./stores/auth";

	const authStore = useAuthStore();
	const { token } = storeToRefs(authStore);

	onMounted(async () => {
		if (token.value) {
			await getMe();
		}
	});
</script>

<template>
	<Header v-if="token" />
	<main>
		<RouterView />
	</main>
</template>

<style scoped>
	#app {
		display: flex;
		flex-direction: column;
	}

	main {
		flex-grow: 1;
		overflow-y: auto;
	}
</style>

