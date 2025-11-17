import { Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Routing;
