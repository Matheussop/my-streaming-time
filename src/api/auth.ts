import {
  AuthResponse,
  RegisterCredentials,
  UserCredentials,
} from "@interfaces/user";
import axiosInstance from "@lib/axiosConfig";

const AUTH_ENDPOINT = "/auth";

/**
 * Realiza o login do usuário
 * @param credentials Credenciais do usuário (email e senha)
 * @returns Promise com a resposta de autenticação
 */
export const login = async (
  credentials: UserCredentials,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_ENDPOINT}/login`,
    credentials,
  );
  return response.data;
};

/**
 * Realiza o registro de um novo usuário
 * @param userData Dados do usuário para registro
 * @returns Promise com a resposta de autenticação
 */
export const register = async (
  userData: RegisterCredentials,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_ENDPOINT}/register`,
    userData,
  );
  return response.data;
};

/**
 * Verifica se o token atual é válido
 * @returns Promise com a resposta de autenticação
 */
export const validateToken = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>(
    `${AUTH_ENDPOINT}/validate`,
  );
  return response.data;
};

/**
 * Realiza o logout do usuário
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post(`${AUTH_ENDPOINT}/logout`);
};
