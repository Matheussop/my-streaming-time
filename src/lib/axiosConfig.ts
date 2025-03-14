import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AppError } from "./appError";

// Define base URL from environment variable or default
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // TODO: add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(AppError.fromError(error));
  },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(AppError.fromError(error));
  },
);

export default axiosInstance;
