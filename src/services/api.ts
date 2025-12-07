import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
	baseURL: "http://localhost:3000/v1",
});

api.interceptors.request.use((config) => {
	const authStore = useAuthStore();
	const token = authStore.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
