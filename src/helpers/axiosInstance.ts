import axios from 'axios';
import { config } from '@/config';

const api = axios.create({
    baseURL: config.api.url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;