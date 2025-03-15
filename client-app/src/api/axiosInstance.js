import axios from "axios";

const API_BASE_URL = " http://localhost:5066"; 
const getToken = () => localStorage.getItem("jwtToken");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обробка помилок у відповідях
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Можеш зробити редирект на логін-сторінку
    }
    return Promise.reject(error);
  }
);

export default api;
