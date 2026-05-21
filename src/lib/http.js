import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, 
  withCredentials: true, 
  headers: {
    'Accept': 'application/json',
  },
});

// Interceptor untuk menangani Error secara terpusat
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Masalah Jaringan/Koneksi Server Gagal');
    } else if (error.response.status === 401) {
      console.warn('Sesi telah berakhir atau unauthorized, silakan login kembali.');
    }
    return Promise.reject(error);
  }
);