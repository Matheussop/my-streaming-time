"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

let hasLoggedIn = false;

export function useAutoDevLogin() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || hasLoggedIn) return;

    const autoLogin = async () => {
      try {
        const res = await login({
          email: process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL as string,
          password: process.env.NEXT_PUBLIC_DEV_LOGIN_PASSWORD as string,
        });

        if (!res) {
          console.error("[DEV LOGIN FAILED]");
        } else {
          console.log("[DEV LOGIN SUCCESSFUL]");
          hasLoggedIn = true;
          router.push("/home");
        }
      } catch (err) {
        console.error("[DEV LOGIN ERROR]", err);
      }
    };

    autoLogin();
  }, [login, router]);

  return null;
}
