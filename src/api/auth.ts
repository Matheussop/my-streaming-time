"use server";

import {
  AuthResponse,
  RegisterCredentials,
  UserCredentials,
} from "@interfaces/user";
import axiosInstance from "@lib/axiosConfig";
import { cookies } from "next/headers";

const AUTH_ENDPOINT = "/auth";

const loginMock = async (
  credentials: UserCredentials,
): Promise<AuthResponse> => {
  return {
    token: "1234567890",
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Realiza o login do usuário
 * @param credentials Credenciais do usuário (email e senha)
 * @returns Promise com a resposta de autenticação
 */
export const login = async (
  credentials: UserCredentials,
): Promise<AuthResponse> => {
  const response = await loginMock(credentials);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", response.token);

  return response;
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

const validateTokenMock = async (): Promise<AuthResponse> => {
  return {
    token: "1234567890",
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Verifica se o token atual é válido
 * @returns Promise com a resposta de autenticação
 */
export const validateToken = async (): Promise<AuthResponse> => {
  // const response = await axiosInstance.get<AuthResponse>(
  //   `${AUTH_ENDPOINT}/validate`,
  // );

  const response = await validateTokenMock();

  return response;
};

/**
 * Realiza o logout do usuário
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post(`${AUTH_ENDPOINT}/logout`);
};
