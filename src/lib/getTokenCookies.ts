"use server";
import { cookies } from "next/headers";

/**
 * Realiza o login do usuário
 * @param credentials Credenciais do usuário (email e senha)
 * @returns Promise com a resposta de autenticação
 */
export const getTokenCookies = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return token;
};
