import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User, UserCredentials, RegisterCredentials } from "@interfaces/user";
import * as authService from "@api/auth";
import { toast } from "sonner";
import { getTokenCookies } from "@lib/getTokenCookies";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserCredentials) => Promise<boolean>;
  register: (userData: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const token = await getTokenCookies();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.validateToken();
      // TODO: update Token in cookies
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      toast.success("Login realizado com sucesso!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Credenciais inválidas. Tente novamente.";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      localStorage.setItem("auth_token", response.token);
      toast.success("Registro realizado com sucesso!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Erro ao registrar. Tente novamente.";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      localStorage.removeItem("auth_token");
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
