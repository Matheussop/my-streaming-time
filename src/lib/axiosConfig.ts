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

// Variável para rastrear se estamos renovando o token
let isRefreshing = false;
// Fila de requisições que aguardam a renovação do token
let failedQueue: { resolve: Function; reject: Function }[] = [];

// Função para processar a fila de requisições após renovação do token
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  // Limpa a fila
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

    // Log para depuração
    console.log(`Erro na requisição: ${error.response?.status}`);

    // Se for erro 401 (Unauthorized) e a requisição ainda não foi refeita
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Detectado erro 401, tentando renovar token");

      if (isRefreshing) {
        console.log(
          "Já estamos atualizando o token, adicionando requisição à fila",
        );
        // Se já estamos atualizando o token, adiciona a requisição à fila
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

      // Marca que estamos atualizando o token e que a requisição será refeita
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Tenta renovar o token usando o serviço dedicado
        console.log("Chamando serviço de renovação de token");
        const response = await refreshToken();
        const newToken = response.token;

        console.log("Token renovado com sucesso");

        // Processa a fila com o novo token
        processQueue(null, newToken);

        // Refaz a requisição original com o novo token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Se falhar na renovação do token, processa a fila com erro
        console.error("Erro ao renovar token:", refreshError);
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
