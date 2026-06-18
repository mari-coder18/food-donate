import axios from "axios";

const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://food-donate-production.up.railway.app/api";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true
});

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