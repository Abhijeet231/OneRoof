import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Body from './components/body/Body.jsx';
import Login from './components/header/Login.jsx';
import Register from './components/header/Register.jsx'
import Error from './components/Error.jsx'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children:[
      {
        index: true, //default child route
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
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {appRouter}   />
  </StrictMode>,
)
