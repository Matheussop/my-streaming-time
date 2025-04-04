import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AppError } from "./appError";
import { getCookies } from "./getCookies";

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
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const cookieStore = await getCookies();

    const token = cookieStore?.value;
    if (token) {
      config.headers.set("authorization", `Bearer ${token}`);
    }
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
