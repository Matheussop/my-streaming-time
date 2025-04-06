"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { RegisterCredentials, UserCredentials } from "@interfaces/user";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@context/AuthContext";
import { cn } from "@lib/utils";
import { useApiRequest } from "@lib/hooks/useApiRequest";
import { AppError } from "@lib/appError";
// Zod validation schemas
const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must have at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must have at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must have at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must have at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must have at least one special character",
  });

const usernameSchema = z
  .string()
  .min(3, { message: "Username must have at least 3 characters" })
  .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Username must contain only letters",
  });

// Login Schema
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z.string().optional(),
});

// Registration Schema
const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

// Validation type
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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { isLoading: isLoadingRegister, execute: executeRegister } =
    useApiRequest<any>(
      (registerData: RegisterCredentials) => register(registerData),
      {
        onSuccess: () => {
          router.push("/login");
        },
      },
    );

  const { isLoading: isLoadingLogin, execute: executeLogin } =
    useApiRequest<any>((loginData: UserCredentials) => login(loginData), {
      onSuccess: () => {
        toast.success("Login successful!");
        router.push("/home");
      },
    });

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
    setFormSubmitted(true);

    if (isLogin) {
      // Login
      await executeLogin({
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Validate form before submitting
      if (!validateForm()) {
        toast.error("Please correct the errors in the form");
        return;
      }
      // Register
      const registerData: RegisterCredentials = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        // confirmPassword: formData.password, // No separate confirmation field in the UI
      };

      executeRegister(registerData);
    }
  };

  // Text and labels based on mode (login/register)
  const pageTexts = {
    title: isLogin ? "Login" : "Create Account",
    button: isLogin ? "Enter" : "Register",
    linkText: isLogin
      ? "Don't have an account? Sign up"
      : "Already have an account? Log in",
    linkHref: isLogin ? "/register" : "/login",
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field - only for registration */}
        {!isLogin && (
          <div className="space-y-2">
            <Label className="text-primary/80" htmlFor="username">
              Name
            </Label>
            <Input
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`bg-background/50 border-foreground/10 backdrop-blur-sm ${
                errors.username
                  ? formSubmitted
                    ? "animate-pulse border-red-500"
                    : "border-red-500"
                  : ""
              }`}
              placeholder="Your name"
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
              errors.email
                ? formSubmitted
                  ? "animate-pulse border-red-500"
                  : "border-red-500"
                : ""
            }`}
            placeholder="your@email.com"
            autoComplete={isLogin ? "email" : "new-email"}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-primary/80" htmlFor="password">
              Password
            </Label>
            {isLogin && (
              <Link
                href="/forgot-password"
                className="text-primary text-xs hover:underline"
              >
                Forgot password?
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
              !isLogin && errors.password
                ? formSubmitted
                  ? "animate-pulse border-red-500"
                  : "border-red-500"
                : ""
            }`}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {!isLogin && (
            <div className="text-muted-foreground mt-1 text-xs">
              <p>Password must contain:</p>
              <ul className="mt-1 ml-2 list-disc space-y-0.5">
                <li
                  className={cn(
                    !formData.password
                      ? ""
                      : formData.password.length >= 8
                        ? "text-green-500"
                        : formSubmitted
                          ? "animate-pulse text-red-500"
                          : "text-red-500",
                  )}
                >
                  At least 8 characters
                </li>
                <li
                  className={cn(
                    !formData.password
                      ? ""
                      : /[A-Z]/.test(formData.password)
                        ? "text-green-500"
                        : formSubmitted
                          ? "animate-pulse text-red-500"
                          : "text-red-500",
                  )}
                >
                  One uppercase letter
                </li>
                <li
                  className={cn(
                    !formData.password
                      ? ""
                      : /[a-z]/.test(formData.password)
                        ? "text-green-500"
                        : formSubmitted
                          ? "animate-pulse text-red-500"
                          : "text-red-500",
                  )}
                >
                  One lowercase letter
                </li>
                <li
                  className={cn(
                    !formData.password
                      ? ""
                      : /[0-9]/.test(formData.password)
                        ? "text-green-500"
                        : formSubmitted
                          ? "animate-pulse text-red-500"
                          : "text-red-500",
                  )}
                >
                  One number
                </li>
                <li
                  className={cn(
                    !formData.password
                      ? ""
                      : /[^A-Za-z0-9]/.test(formData.password)
                        ? "text-green-500"
                        : formSubmitted
                          ? "animate-pulse text-red-500"
                          : "text-red-500",
                  )}
                >
                  One special character
                </li>
              </ul>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoadingRegister || isLoadingLogin}
          className="bg-primary hover:bg-primary/90 w-full"
        >
          {isLoadingRegister || isLoadingLogin
            ? "Processing..."
            : pageTexts.button}
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
