import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ 
        message: 'Request timed out. Please check your internet connection.' 
      });
    }

    if (!error.response) {
      return Promise.reject({ 
        message: 'Network error. Please check your internet connection and try again.' 
      });
    }

    if (error.response.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error.response.data || { message: error.message });
  }
);

export default api;