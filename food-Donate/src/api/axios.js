import axios from "axios";

const api = axios.create({
  baseURL: "https://food-donate-production.up.railway.app/api",
  withCredentials: true
});

// ================= TOKEN INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;