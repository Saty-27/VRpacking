import axios from 'axios';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const configuredApiBase = import.meta.env.VITE_API_URL?.trim();
const defaultApiBase = import.meta.env.DEV ? 'http://localhost:5001' : '';
const API_BASE = trimTrailingSlash(configuredApiBase || defaultApiBase);

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vrpack_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vrpack_token');
      localStorage.removeItem('vrpack_user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const API_URL = API_BASE;
export default api;
