import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://curalink-peb6.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // important — backend CORS must allow credentials
});

// optional: attach Bearer token if you prefer (localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
