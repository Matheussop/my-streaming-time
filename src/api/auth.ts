"use server";
import {
  AuthResponse,
  RegisterCredentials,
  UserCredentials,
} from "@interfaces/user";
import axiosInstance from "@lib/axiosConfig";
import {
  setAuthTokens,
  removeAuthTokens,
  getRefreshToken,
} from "@lib/tokenService";

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

  // Armazena token e refresh token (se existir)
  await setAuthTokens(response.data.token, response.data.refreshToken);

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

  // Se a API retornar um novo token, atualizar nos cookies
  if (response.data.token) {
    await setAuthTokens(response.data.token, response.data.refreshToken);
  }
  return response.data;
};

/**
 * Atualiza o token usando o refresh token
 * @returns Promise com o novo token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = await getRefreshToken();
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_ENDPOINT}/refresh-token`,
    { refreshToken },
  );

  // Armazena os novos tokens
  if (response.data.token) {
    await setAuthTokens(response.data.token, response.data.refreshToken);
  }

  return response.data;
};

const logoutMock = async (): Promise<void> => {};
/**
 * Realiza o logout do usuário
 */
export const logout = async (): Promise<void> => {
  try {
    // await axiosInstance.post(`${AUTH_ENDPOINT}/logout`);
    await logoutMock();
  } finally {
    // Remover tokens independente do resultado da requisição
    await removeAuthTokens();
  }
};
