import axios from 'axios';
const BACKEND = 'http://localhost:5000/api';
const api = axios.create({ baseURL: BACKEND, timeout: 5000 });
export default api;
