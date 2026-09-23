import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
const C = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/auth/me")
      .then((r) => setUser(r.data.user))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const login = async (data) => {
    const r = await api.post("/auth/login", data);
    setUser(r.data.user);
  };
  const register = async (data) => {
    const r = await api.post("/auth/register", data);
    setUser(r.data.user);
  };
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };
  return (
    <C.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </C.Provider>
  );
}
export const useAuth = () => useContext(C);
