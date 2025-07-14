import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const csrf = localStorage.getItem("CSRF_TOKEN");
    if (!csrf) {
      try {
        const res = await axios.get("http://localhost:8080/auth/csrf-token");
        const csrfToken = res.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    if (csrf) {
      config.headers["X-XSRF-TOKEN"] = csrf;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
