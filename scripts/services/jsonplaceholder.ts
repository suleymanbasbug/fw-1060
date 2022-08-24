import axios from 'axios';
export const sc = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
});
