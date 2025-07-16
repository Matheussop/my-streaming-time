"use server";
import {
  AuthResponse,
  RegisterCredentials,
  UserCredentials,
} from "@interfaces/user";
import axiosInstance from "@lib/axiosConfig";
import { removeAuthTokens, getRefreshToken } from "@lib/tokenService";

const AUTH_ENDPOINT = "/auth";

/**
 * Performs user login
 * @param credentials User credentials (email and password)
 * @returns Promise with authentication response
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
 * Registers a new user
 * @param userData User data for registration
 * @returns Promise with authentication response
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
 * Validates if the current token is valid
 * @returns Promise with authentication response
 */
export const validateToken = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>(
    `${AUTH_ENDPOINT}/validate`,
  );

  return response.data;
};

/**
 * Updates the token using refresh token
 * @returns Promise with the new token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = await getRefreshToken();
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_ENDPOINT}/refresh-token`,
    { refreshToken },
  );

  return response.data;
};

const logoutMock = async (): Promise<void> => {};
/**
 * Performs user logout
 */
export const logout = async (): Promise<void> => {
  try {
    // await axiosInstance.post(`${AUTH_ENDPOINT}/logout`);
    await logoutMock();
  } finally {
    // Remove tokens regardless of request result
    await removeAuthTokens();
  }
};
