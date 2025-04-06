import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AppError } from "./appError";
import { refreshToken } from "@api/auth";
import { getAuthToken } from "./tokenService";

// Define base URL from environment variable or default
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Variable to track if we are renewing the token
let isRefreshing = false;
// Queue of requests waiting for token renewal
let failedQueue: { resolve: Function; reject: Function }[] = [];

// Function to process the request queue after token renewal
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  // Clear the queue
  failedQueue = [];
};

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
    const token = await getAuthToken();
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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If it's a 401 error (Unauthorized) and the request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already updating the token, add the request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mark that we're updating the token and that the request will be retried
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to renew the token using the dedicated service
        const response = await refreshToken();
        const newToken = response.token;

        // Process the queue with the new token
        processQueue(null, newToken);

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If token renewal fails, process the queue with error
        console.error("Error renewing token:", refreshError);
        processQueue(refreshError, null);
        return Promise.reject(AppError.fromError(refreshError as Error));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(AppError.fromError(error));
  },
);

export default axiosInstance;
