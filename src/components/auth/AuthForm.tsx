"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { RegisterCredentials } from "@interfaces/user";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@context/AuthContext";

// Esquemas de validação Zod
const emailSchema = z
  .string()
  .min(1, { message: "Email é obrigatório" })
  .email({ message: "Email inválido" });

const passwordSchema = z
  .string()
  .min(6, { message: "Senha deve ter no mínimo 6 caracteres" });

const usernameSchema = z
  .string()
  .min(3, { message: "Username deve ter no mínimo 3 caracteres" })
  .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Username deve conter apenas letras",
  });

// Esquema para Login
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z.string().optional(),
});

// Esquema para Registro
const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

// Tipo das validações
type FormErrors = {
  email?: string;
  password?: string;
  username?: string;
};

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const router = useRouter();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const schema = isLogin ? loginSchema : registerSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        formattedErrors[path] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulário antes de enviar
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const success = await login({
          email: formData.email,
          password: formData.password,
        });

        if (success) {
          toast.success("Login realizado com sucesso!");
          router.push("/home");
        }
      } else {
        // Register
        const registerData: RegisterCredentials = {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          // confirmPassword: formData.password, // No campo de confirmação separado na UI
        };

        const success = await register(registerData);

        if (success) {
          toast.success("Conta criada com sucesso!");
          router.push("/login");
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        isLogin
          ? "Falha ao fazer login. Verifique suas credenciais."
          : "Falha ao criar conta. Tente novamente.",
      );
      setLoading(false);
    }
  };

  // Texto e rótulos com base no modo (login/registro)
  const pageTexts = {
    title: isLogin ? "Login" : "Criar Conta",
    button: isLogin ? "Entrar" : "Cadastrar",
    linkText: isLogin
      ? "Não tem uma conta? Cadastre-se"
      : "Já tem uma conta? Faça login",
    linkHref: isLogin ? "/register" : "/login",
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo nome - apenas para registro */}
        {!isLogin && (
          <div className="space-y-2">
            <Label className="text-primary/80" htmlFor="username">
              Nome
            </Label>
            <Input
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`bg-background/50 border-foreground/10 backdrop-blur-sm ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Seu nome"
              autoComplete="username"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-primary/80" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`bg-background/50 border-foreground/10 backdrop-blur-sm ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="seu@email.com"
            autoComplete={isLogin ? "email" : "new-email"}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-primary/80" htmlFor="password">
              Senha
            </Label>
            {isLogin && (
              <Link
                href="/forgot-password"
                className="text-primary text-xs hover:underline"
              >
                Esqueceu a senha?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`bg-background/50 border-foreground/10 backdrop-blur-sm ${
              errors.password ? "border-red-500" : ""
            }`}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
          {!isLogin && !errors.password && (
            <div className="text-muted-foreground mt-1 text-xs">
              <p>A senha deve conter:</p>
              <ul className="mt-1 ml-2 list-disc space-y-0.5">
                <li
                  className={
                    formData.password.length >= 8 ? "text-green-500" : ""
                  }
                >
                  Pelo menos 8 caracteres
                </li>
                <li
                  className={
                    /[A-Z]/.test(formData.password) ? "text-green-500" : ""
                  }
                >
                  Uma letra maiúscula
                </li>
                <li
                  className={
                    /[a-z]/.test(formData.password) ? "text-green-500" : ""
                  }
                >
                  Uma letra minúscula
                </li>
                <li
                  className={
                    /[0-9]/.test(formData.password) ? "text-green-500" : ""
                  }
                >
                  Um número
                </li>
                <li
                  className={
                    /[^A-Za-z0-9]/.test(formData.password)
                      ? "text-green-500"
                      : ""
                  }
                >
                  Um caractere especial
                </li>
              </ul>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full"
        >
          {loading ? "Processando..." : pageTexts.button}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          <Link
            href={pageTexts.linkHref}
            className="text-primary hover:underline"
          >
            {pageTexts.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
