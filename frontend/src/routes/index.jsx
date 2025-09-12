import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import Body from "@/components/body/Body.jsx";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";
import Error from "@/components/Error";

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
            }
        ]
    }
]);

export default router;


