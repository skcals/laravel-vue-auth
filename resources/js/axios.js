import axios from 'axios';
import store from './store'
import router from './router'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
})

axiosClient.interceptors.response.use(res => {
    return res;
}, error => {
    if (error.response.status === 401) {
        store.commit('logout')
        router.push({ name: "Login" })
    } else if (error.response.status === 404) {
        router.push({ name: 'NotFound' })
    }
    throw error;
})



export default axiosClient;