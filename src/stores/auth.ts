import { defineStore } from "pinia";
import type { User } from "@/types";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null as string | null,
		user: null as User | null,
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUser(user: User) {
			this.user = user;
		},
		logout() {
			this.token = null;
			this.user = null;
		},
	},
});
