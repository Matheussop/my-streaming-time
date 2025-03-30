"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { login, register } from "@api/auth";
import { RegisterCredentials } from "@interfaces/user";
import Link from "next/link";

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success;
      const registerCredentials: RegisterCredentials = {
        email,
        password,
        name,
        confirmPassword: password,
      };
      if (isLogin) {
        success = await login({ email, password });
        if (success) router.push("/dashboard");
      } else {
        success = await register(registerCredentials);
        if (success) router.push("/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label className="text-primary/80" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="bg-background/50 border-foreground/10 backdrop-blur-sm"
              placeholder="John Doe"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-primary/80" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            required
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="bg-background/50 border-foreground/10 backdrop-blur-sm"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-primary/80" htmlFor="password">
              Password
            </Label>
            {isLogin && (
              <a
                href="#"
                className="text-primary text-xs hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset functionality would be here");
                }}
              >
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            required
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="bg-background/50 border-foreground/10 backdrop-blur-sm"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full"
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-primary ml-2 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
