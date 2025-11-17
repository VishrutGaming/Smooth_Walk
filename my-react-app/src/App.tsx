import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Screens/Routing";
import { Toaster } from "react-hot-toast";
import { Appprovider } from "./Context/AppContext";

function App() {
  return (
    <Appprovider>
      <React.StrictMode>
        <BrowserRouter>
          <Routing />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </React.StrictMode>
    </Appprovider>
  );
}

export default App;
