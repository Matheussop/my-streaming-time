"use server";
import { cookies } from "next/headers";

/**
 * Stores the authentication token in cookies
 * @param token Authentication token
 * @param refreshToken Optional refresh token
 */
export const setAuthTokens = async (
  token: string,
  refreshToken?: string,
): Promise<void> => {
  const cookieStore = await cookies();

  // Set expiration for the main token (24h)
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  // If there's a refresh token, store it as well (7 days)
  if (refreshToken) {
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }
};

/**
 * Gets the authentication token from cookies
 * @returns Authentication token
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
};

/**
 * Gets the refresh token from cookies
 * @returns Refresh token
 */
export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value;
};

/**
 * Removes authentication tokens from cookies
 */
export const removeAuthTokens = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("refresh_token");
};
