import Navbar from "./components/navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/navbar/Footer.jsx";



function App() {

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar/>

    <main className=" flex-1">
       <Outlet/>
    </main>


    <Footer/>
    <ToastContainer position="top-center" autoClose={3000}  transition={Zoom}/>
   </div>

  )
}

export default App ;
