import axios from "axios";
import { createContext, useContext, useEffect, useState, useMemo, } from "react";

//Creating Context
const AuthContext = createContext();

//Providing Context
const AuthProvider = ({children}) => {
    const [token, setToken_] = useState(localStorage.getItem("accessToken") || null);

const setToken = (newToken) => {
    setToken_(newToken)
};

//Syncing axios + localStorage when token Changes
useEffect(() => {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("accessToken", token);
    }else{
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("accessToken");
    }
}, [token]);

//auto-load token on mount (refresh session)
useEffect(() => {
    const checkSession = async() => {
        try{
            const res = await axios. get("http://localhost:8000/api/v1/users/refresh",{}, {withCredentials: true}  );

            if(res.data?.data?.accessToken){
                setToken(res.data.data.accessToken);
            }

        }catch(err){
            console.log("No active session", err.message);
            
        }
    };

    if(!token) checkSession();
}, []);

//Interceptor: auto-refresh if token expires
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const res = await axios.post("http://localhost:8000/api/v1/users/refresh", {}, { withCredentials: true });
            if (res.data?.data?.accessToken) {
              setToken(res.data.data.accessToken);
              originalRequest.headers["Authorization"] = `Bearer ${res.data.data.accessToken}`;
              return axios(originalRequest); // retry original request
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
      axios.interceptors.response.eject(interceptor);
    };
  }, [token]);


//logout
const logout = async() => {
    setToken(null);
    await axios.post("http://localhost:8000/api/v1/users/logout", {}, {withCredentials: true});

};

const contextValue = useMemo(
    () => ({
        token,
        setToken,
        logout,
        isAuthenticated: !!token

    }),
    [token]
);

return <AuthContext.Provider value={contextValue}> {children} </AuthContext.Provider>

};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;

