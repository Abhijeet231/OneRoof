import Navbar from "./components/header/Navbar.jsx";
import {Outlet} from "react-router-dom";


function App() {
 
  return (
    <>
    <Navbar/>
    <Outlet/>
   </>

  )
}

export default App ;
