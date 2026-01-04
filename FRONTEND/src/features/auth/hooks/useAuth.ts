import { useState } from "react";
import AuthApi, {
  RegisterPayload,
  LoginPayload,
  User,
} from "../services/AuthApi";


//   Return type interface


interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterPayload) => Promise<AuthResult>;
  login: (data: LoginPayload) => Promise<AuthResult>;
  logout: () => void;
}


//   Result interface


interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}


//   Hook

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* ========= Register ========= */
  const register = async (
    userData: RegisterPayload
  ): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthApi.register(userData);

      localStorage.setItem("token", response.token);
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /* ========= Login ========= */
  const login = async (
    credentials: LoginPayload
  ): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthApi.login(credentials);

      localStorage.setItem("token", response.token);
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    
  };
};

export default useAuth;
