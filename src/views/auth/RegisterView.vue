<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { register as registerService } from '@/services/authService'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

const register = async () => {
    try {
        await registerService({
            name: name.value,
            email: email.value,
            password: password.value,
        })
        toast.success('Registered successfully')
        router.push({ name: 'login' })
    } catch (error) {
        console.log(error)
        toast.error('Failed to register')
    }
}
</script>

<template>
    <div class="centered-container">
        <div class="register-container">
            <h1>Register</h1>
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input id="name" v-model="name" type="text" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?
                <RouterLink to="/login">Login here</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
.register-container {
    max-width: 400px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 0.5rem;
    color: white;
    cursor: pointer;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
}

button:hover {
    background-color: #0056b3;
}

p {
    margin-top: 1rem;
    text-align: center;
}
</style>
