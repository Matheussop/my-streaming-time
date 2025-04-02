"use server";

import { cookies } from "next/headers";

export async function getCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token");
}
