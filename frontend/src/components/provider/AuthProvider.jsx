import api from "@/lib/api.js"; 
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [listingIds, setListingIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load session + user on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.data?.data?.currUser) {
          setCurrentUser(res.data?.data?.currUser); 
          setListingIds(res?.data?.data?.listingIds);
          console.log("This is RAW RESPNSE in AuthProvider", res);
          
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.log("No active session", err.message);
        setCurrentUser(null);
        setListingIds(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login (backend sets cookies)
  const login = async (credentials) => {
    const res = await api.post("/users/login", credentials);
    if (res.data?.data?.user) {
      setCurrentUser(res.data?.data?.user); // same structure
      setListingIds(res.data?.data?.listingIds)
       
       
    }
    return res;
  };

  // Logout (backend clears cookies + local state)
  const logout = async () => {
    await api.post("/users/logout");
    setCurrentUser(null);
  };

  // Axios interceptor for automatic token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config || {};

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await api.post("/users/refresh");
            return api(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed", refreshError);
            setCurrentUser(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      listingIds,
      setCurrentUser,
      login,
      logout,
      isAuthenticated: !!currentUser,
      loading,
    }),
    [currentUser,listingIds, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

