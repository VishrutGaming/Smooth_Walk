
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth";

function Routing() {
  return (
    
        <Routes>
        <Route path="/" element={ <Auth/>} />
      </Routes>
      
  
  )
}

export default Routing
