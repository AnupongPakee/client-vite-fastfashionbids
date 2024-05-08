import React from "react";
import "./App.css";

// Import Package
import { Route, Routes } from "react-router-dom";

// Import Components
import Index from "./home/Index";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./home/Home";
import Exchange from "./components/Exchange";
import Mystore from "./components/Mystore";
import Auction from "./components/Auction";
import Profile from "./components/Profile";
import About from "./components/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/profile/:id" element={<Profile />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/exchange/:id" element={<Exchange />} />
        <Route path="/auction/:id" element={<Auction />} />
        <Route path="/my/store/:id" element={<Mystore />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
