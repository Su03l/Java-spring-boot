import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Default Spring Boot backend URL. Can be customized via environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor: Attach JWT Token if present
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralize error handling & authentication routing
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData = error.response?.data as { message?: string } | undefined;
    const errorMessage = responseData?.message || error.message || 'An unexpected error occurred';

    // Standardize error message for frontend state tracking
    const customError = {
      message: errorMessage,
      status: error.response?.status || 500,
      originalError: error,
    };

    return Promise.reject(customError);
  }
);

export default api;
