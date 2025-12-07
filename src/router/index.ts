import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/boards",
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/auth/LoginView.vue"),
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/auth/RegisterView.vue"),
		},
		{
			path: "/boards",
			name: "boards",
			component: () => import("../views/boards/BoardsView.vue"),
			meta: { requiresAuth: true },
		},
		{
			path: "/boards/:id",
			name: "board",
			component: () => import("../views/boards/BoardView.vue"),
			meta: { requiresAuth: true },
		},
	],
});

router.beforeEach((to, _from, next) => {
	const authStore = useAuthStore();
	const isAuthenticated = !!authStore.token;

	if (isAuthenticated && (to.path === "/login" || to.path === "/register")) {
		next("/boards");
	} else if (to.meta.requiresAuth && !isAuthenticated) {
		next("/login");
	} else {
		next();
	}
});

export default router;
