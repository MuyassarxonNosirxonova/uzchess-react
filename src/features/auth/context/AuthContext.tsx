import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ACCESS_TOKEN_STORAGE_KEY } from "../../../api/axios";
import { decodeJwtPayload } from "../jwt/jwt";
import { AuthContext } from "./authContextDefinition.ts";

function readAuthState() {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (!token) return { hasToken: false, displayName: null as string | null };

  const payload = decodeJwtPayload(token);
  const displayName = payload?.fullName ??  payload?.username ?? null;
  return { hasToken: true, displayName };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ hasToken, displayName }, setAuthState] = useState(() => readAuthState());

  useEffect(() => {
    function handleStorageChange() {
      setAuthState(readAuthState());
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function login(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    setAuthState(readAuthState());
  }

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    setAuthState({ hasToken: false, displayName: null });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: hasToken, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}