import { createContext } from "react";

export interface AuthContextValue {
  isAuthenticated: boolean;
  displayName: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);