"use server";
import { cookies } from "next/headers";

/**
 * Armazena o token de autenticação nos cookies
 * @param token Token de autenticação
 * @param refreshToken Refresh token opcional
 */
export const setAuthTokens = async (
  token: string,
  refreshToken?: string,
): Promise<void> => {
  const cookieStore = await cookies();

  // Definir expiração para o token principal (24h)
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 horas
    path: "/",
  });

  // Se houver refresh token, armazená-lo também (7 dias)
  if (refreshToken) {
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });
  }
};

/**
 * Obtém o token de autenticação dos cookies
 * @returns Token de autenticação
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
};

/**
 * Obtém o refresh token dos cookies
 * @returns Refresh token
 */
export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value;
};

/**
 * Remove os tokens de autenticação dos cookies
 */
export const removeAuthTokens = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("refresh_token");
};
