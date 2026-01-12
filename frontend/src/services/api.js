import axios from 'axios'
import useAuthStore from '../stores/authStore'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor - add token
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth endpoints
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
}

// Exercise endpoints
export const exerciseAPI = {
    getAll: () => api.get('/exercises'),
    getById: (id) => api.get(`/exercises/${id}`),
    submit: (submission) => api.post('/exercises/submit', submission),
}

// User endpoints
export const userAPI = {
    getProfile: () => api.get('/users/me'),
}

export default api