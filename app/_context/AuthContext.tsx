"use client"
import { createContext, useContext, useEffect, useState } from "react";
import api, { getCSRF } from "../_api/_api";

interface User {
  id: number;
  userName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // при загрузке приложения пытаемся получить пользователя
  useEffect(() => {
    const laravelCookie = document.cookie.includes("laravel_session");
    if (!laravelCookie) {
      setLoading(false);
      return;
    }
  
    (async () => {
      try {
        await getCSRF();
        const res = await api.get("/user");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  
  const login = async (login: string, password: string) => {
    const res = await api.post("/login", { login, password });
    setUser(res.data.user);
  };

  const register = async (data: any) => {
    await api.post("/register", data);
    const res = await api.post("/login", {
      login: data.email || data.userName,
      password: data.password,
    });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
