import { useAuthStore } from "@/stores/auth";
import type { LoginDto, RegisterDto } from "@/types";
import api from "./api";

export const login = async (credentials: LoginDto) => {
	const store = useAuthStore();
	const response = await api.post<{ access_token: string }>(
		"/auth/login",
		credentials,
	);
	const token = response.data.access_token;
	store.setToken(token);
	return token;
};

export const register = async (userInfo: RegisterDto) => {
	await api.post("/auth/register", userInfo);
};
