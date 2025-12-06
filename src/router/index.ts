import { createRouter, createWebHistory } from "vue-router";

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
		},
		{
			path: "/boards/:id",
			name: "board",
			component: () => import("../views/boards/BoardView.vue"),
		},
	],
});

export default router;
