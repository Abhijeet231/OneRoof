import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({children}) {
    const {currentUser, loading} = useAuth();

    useEffect(() => {
        if(!loading && !currentUser){
            toast.error("⚠️ Please login to continue!");
        }
    }, [currentUser, loading])

  if(loading){
    return <div> Loading.....</div>
  };

  if(!currentUser){
    return <Navigate to= "/login" replace />
  }

    return children ? children : <Outlet/>;
}