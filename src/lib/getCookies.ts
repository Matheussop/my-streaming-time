"use server";

import { cookies } from "next/headers";

export async function getCookies(cookieName?: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName || "auth_token");
}
