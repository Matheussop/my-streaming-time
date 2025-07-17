const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Updates the token on the next server
 * @param token - The new token
 * @param refreshToken - The new refresh token (optional)
 */
export async function updateTokenOnNext(token: string, refreshToken?: string) {
  // Detecta se está no browser
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser
    ? "/api/auth/update-token"
    : `${baseUrl}/api/auth/update-token`;

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ token, refreshToken }),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  });
}
