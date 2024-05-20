import React from "react";
import "./App.css";

// Import Package
import { Route, Routes } from "react-router-dom";

// Import Components
import Index from "./home/Index";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Admin from "./admin/Admin"
import Home from "./home/Home";
import Exchange from "./components/Exchange";
import Mystore from "./components/Mystore";
import Auction from "./components/Auction";
import Profile from "./components/Profile";
import Viewexchange from "./components/Viewexchange";
import Viewexchangenl from "./components/Viewexchangenl";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/:id" element={<Admin/>}/>
        <Route path="/edit/profile/:id" element={<Profile />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/exchange/:id" element={<Exchange />} />
        <Route path="/auction/:id" element={<Auction />} />
        <Route path="/my/store/:id" element={<Mystore />} />
        <Route path="/view/exchange/:id_ex/:id" element={<Viewexchange />} />
        <Route path="/view/exchange/:id_ex/no-login" element={<Viewexchangenl />} />
      </Routes>
    </>
  );
}

export default App;
