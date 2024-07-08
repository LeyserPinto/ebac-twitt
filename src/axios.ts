import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Update this to your Django backend URL
});


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export default instance;