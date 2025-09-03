import Navbar from "./components/header/Navbar.jsx";
import {Outlet} from "react-router-dom";
import { Bounce, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer position="top-center" autoClose={3000}  transition={Zoom}/>
   </>

  )
}

export default App ;
