import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Restore session on page reload
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        fetchMe(storedToken)
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("authUser", JSON.stringify(data.user));
          })
          .catch(() => clearAuth())
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Helpers
  const saveAuth = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authToken", jwtToken);
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  //  Signup
  const signup = async (username, email, password) => {
    try {
      setError(null);
      const { data } = await apiClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      saveAuth(
        { userId: data.userId, username: data.username, email: data.email },
        data.token
      );
      saveAuth(data.user, data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  //  Login
  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await apiClient.post("/auth/login", { email, password });
      saveAuth(
        { userId: data.userId, username: data.username, email: data.email },
        data.token
      );
      saveAuth(data.user, data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  //  Logout
  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.warn("Logout error:", err);
    }
    clearAuth();
  };

  // Fetch current user
  const fetchMe = async (jwtToken) => {
    const { data } = await apiClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
