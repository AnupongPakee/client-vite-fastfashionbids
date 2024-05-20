import React from "react";

// Import Style Css
import "../css/menu.css";

// Import Package
import { NavLink } from "react-router-dom";

function Menu() {
  const ActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#cc527a" : "#edeae5",
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
          {/* <NavLink style={ActiveLink} to={"/login"}>
            Auction
          </NavLink> */}
          <NavLink style={ActiveLink} to={"/login"}>
            Exchange
          </NavLink>
          <NavLink style={ActiveLink} to={"/login"}>
            My Store
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
