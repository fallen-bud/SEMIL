
// create context
//  destructuring = {} tab lagate hain jab parameter ek object ho
// aur uske andar se value nikaalni ho


import { createContext, useContext, ReactNode } from "react";
import useAuth from "../features/auth/hooks/useAuth";
import { User } from "../features/auth/services/AuthApi";

/* ======================
   Context Type
====================== */

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: ReturnType<typeof useAuth>["register"];
  login: ReturnType<typeof useAuth>["login"];
}

/* ======================
   Create Context
====================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ======================
   Provider Props
====================== */

interface AuthProviderProps {
  children: ReactNode;
}

/* ======================
   Auth Provider
====================== */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/* ======================
   Custom Hook
====================== */

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider"
    );
  }

  return context;
};
