import React from "react";

// Import Style Css
import "../css/menu.css";

// Import Package
import { NavLink } from "react-router-dom";

function Menu() {
  const ActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#00ff80" : "#fff",
    };
  };
  return (
    <div className="container-menu">
      <div className="content-menu">
        <NavLink to={"/"} className="web-name">
          FastFashion Bids
        </NavLink>
        <div className="nav-text">
          <NavLink style={ActiveLink} to={"/"}>
            Home
          </NavLink>
          <NavLink style={ActiveLink} to={"/auction"}>
            Auction
          </NavLink>
          <NavLink style={ActiveLink} to={"/exchane"}>
            Exchange
          </NavLink>
          <NavLink style={ActiveLink} to={"/about"}>
            About
          </NavLink>
        </div>
        <div className="sign-in-up">
            <NavLink style={ActiveLink} to={"/login"}>
              Sign In
            </NavLink>
            <NavLink style={ActiveLink} to={"/register"}>
              Sign Up
            </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;
