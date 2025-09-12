import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import Body from "@/components/body/Body.jsx";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";
import Error from "@/components/Error";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import AccountSetting from "@/components/accountSetting/AccountSetting";
import Profile from "@/components/profile/Profile";


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
            //Protected
            {
                element: <ProtectedRoute/>,
                children: [
                    {path: "profile", element: <Profile/>},
                    {path: "settings", element: <AccountSetting/>}
                ],
            },
        ],
    },
]);

export default router;


