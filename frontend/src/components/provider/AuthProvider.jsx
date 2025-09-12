import api from "@/lib/api.js"; // <-- instead of axios
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(
    localStorage.getItem("accessToken") || null
  );

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  // Sync token to axios + localStorage
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("accessToken", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  // Auto-load session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.post("/users/refresh");
        if (res.data?.data?.accessToken) {
          setToken(res.data.data.accessToken);
        }
      } catch (err) {
        console.log("No active session", err.message);
      }
    };

    if (!token) checkSession();
  }, []);

  // Interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config || {};
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const res = await api.post("/users/refresh");
            if (res.data?.data?.accessToken) {
              setToken(res.data.data.accessToken);
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${res.data.data.accessToken}`;
              return api(originalRequest); // retry request with new token
            }
          } catch (err) {
            console.error("Refresh failed", err);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [token]);

  // Logout
  const logout = async () => {
    setToken(null);
    await api.post("/users/logout");
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
      isAuthenticated: !!token,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
