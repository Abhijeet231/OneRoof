import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import Body from "@/components/body/Body.jsx";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";
import Error from "@/components/Error";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import AccountSetting from "@/components/accountSetting/AccountSetting";
import Profile from "@/components/profile/Profile";
import CreateListing from "@/components/listings/CreateListing";
import ShowListing from "@/components/listings/ShowListing";
import EditListing from "@/components/listings/EditListing";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Body/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "listings/:id",
                element: <ShowListing/>
            },
            //Protected Routes
            {
                element: <ProtectedRoute/>,
                children: [
                    {path: "profile", element: <Profile/>},
                    {path: "settings", element: <AccountSetting/>},
                    {
                        path: "listings",
                        children:[
                            {index: true, element: <CreateListing/>},
                            {path:":id/edit", element: <EditListing/>}
                           
                        ]    
                    },
                   
                ]
            },
        ],
    },
]);

export default router;


