import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

api.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    // TEST
    const token = authStore.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
