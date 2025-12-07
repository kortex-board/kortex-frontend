import { useAuthStore } from "@/stores/auth";
import type { LoginDto, RegisterDto, User } from "@/types";
import api from "./api";

export const getMe = async () => {
	const store = useAuthStore();
	const response = await api.get<User>("/user/me");
	store.setUser(response.data);
	return response.data;
};

export const login = async (credentials: LoginDto) => {
	const store = useAuthStore();
	const response = await api.post<{ access_token: string }>(
		"/auth/login",
		credentials,
	);
	const token = response.data.access_token;
	store.setToken(token);
	await getMe();
	return token;
};

export const register = async (userInfo: RegisterDto) => {
	await api.post("/auth/register", userInfo);
};
