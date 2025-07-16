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
import { getAuthToken } from "@lib/tokenService";
import { ensureBackendReady } from "@lib/healthCheck";
import { BackendLoading } from "@components/common/BackendLoading";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserCredentials) => Promise<boolean>;
  updateUser: (user: User) => void;
  register: (userData: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [backendProgress, setBackendProgress] = useState<{
    attempt: number;
    maxAttempts: number;
    elapsedTime: number;
  } | null>(null);

  const checkAuth = async () => {
    const token = await getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.validateToken();
      if (response.token) {
        await updateTokenOnNext(response.token, response.refreshToken);
      }
      // TODO: update Token in cookies
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeBackend = async () => {
    try {
      console.log("🔍 Verificando disponibilidade do backend...");
      await ensureBackendReady((attempt, maxAttempts, elapsedTime) => {
        setBackendProgress({ attempt, maxAttempts, elapsedTime });
      });
      setIsBackendReady(true);
      setBackendProgress(null);
      console.log("✅ Backend está pronto, verificando autenticação...");
      await checkAuth();
    } catch (error) {
      console.error("❌ Erro ao inicializar backend:", error);
      toast.error("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const retryBackendConnection = () => {
    setBackendProgress(null);
    setIsBackendReady(false);
    setIsLoading(true);
    initializeBackend();
  };

  useEffect(() => {
    initializeBackend();
  }, []);

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Ensure backend is ready before login
      if (!isBackendReady) {
        await ensureBackendReady();
        setIsBackendReady(true);
      }

      const response = await authService.login(credentials);
      if (response.token) {
        await updateTokenOnNext(response.token, response.refreshToken);
      }
      setUser(response.user);
      toast.success("Login realizado com sucesso!");
      return true;
    } catch (error: any) {
      const errorMessageArray = error.message.split("\n");
      errorMessageArray.forEach((error: string) => {
        toast.error(error);
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Ensure backend is ready before register
      if (!isBackendReady) {
        await ensureBackendReady();
        setIsBackendReady(true);
      }

      await authService.register(userData);
      toast.success("Registro realizado com sucesso!");
      return true;
    } catch (error: any) {
      const errorMessageArray = error.message.split("\n");
      errorMessageArray.forEach((error: string) => {
        toast.error(error);
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setUser(null);
      await authService.logout();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  // Show backend loading if backend is not ready yet
  if (!isBackendReady && isLoading) {
    return (
      <BackendLoading
        message="Inicializando conexão com o servidor..."
        attempt={backendProgress?.attempt}
        maxAttempts={backendProgress?.maxAttempts}
        elapsedTime={backendProgress?.elapsedTime}
        onRetry={retryBackendConnection}
      />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
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
