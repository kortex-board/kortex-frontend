import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import BoardsView from "../views/boards/BoardsView.vue";
import BoardView from "../views/boards/BoardView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/login",
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/register",
			name: "register",
			component: RegisterView,
		},
		{
			path: "/boards",
			name: "boards",
			component: BoardsView,
			meta: { requiresAuth: true },
		},
		{
			path: "/boards/:id",
			name: "board",
			component: BoardView,
			meta: { requiresAuth: true },
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/login",
		},
	],
});

router.beforeEach((to, _from, next) => {
	const authStore = useAuthStore();
	const isAuthenticated = !!authStore.token;

	if (isAuthenticated && (to.name === "login" || to.name === "register")) {
		next(false);
	} else if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: "login" });
	} else {
		next();
	}
});

export default router;
