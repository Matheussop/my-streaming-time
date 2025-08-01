"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAutoDevLogin } from "@lib/useAutoDevLogin";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  useAutoDevLogin();
  const pathname = usePathname();

  const isLogin = pathname.includes("/login");
  const isRegister = pathname.includes("/register");
  let title = "Autenticação";
  let subtitle = "Acesse sua conta ou crie uma nova";

  if (isLogin) {
    title = "Login";
    subtitle = "Entre com seu email e senha para acessar sua conta";
  } else if (isRegister) {
    title = "Cadastro";
    subtitle = "Crie uma conta para começar a usar a plataforma";
  }

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-black">
      <div className="relative hidden lg:block lg:w-1/2 xl:w-3/5">
        <div
          className="hero-gradient absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <h1 className="text-glow mb-2 text-4xl font-bold tracking-tight md:text-5xl">
              My-Streaming-Time
            </h1>
            <p className="max-w-md text-center text-xl">
              Track your favorite shows and movies. Discover your watching
              habits.
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="bg-dark-600 flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2 xl:w-2/5">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-primary mb-2 text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
