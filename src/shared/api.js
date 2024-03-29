import axios from "axios";

// Axios 인스턴스 설정
const api = axios.create({
  baseURL: "https://stockscreener.shop",
  withCredentials: true,
});

const getToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

api.interceptors.request.use(async config => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  config.headers["authorization"] = await getToken();
  return config;
});

export default api;
