import React, { useEffect, useState } from "react";

import { viewProfile } from "../../api/user";

// Import Style Css
import "../css/menuauth.css";

// Import Package
import { NavLink, useParams } from "react-router-dom";

function Menuauth() {
  const params = useParams();
  const [data, setData] = useState({
    img: "",
    fname: "",
    lname: "",
    tel: "",
    address: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = (id) => {
    viewProfile(id)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const ActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#cc527a" : "#edeae5",
    };
  };
  return (
    <div className="container-menu-auth">
      <div className="content-menu-auth">
        <NavLink to={"/home/" + params.id} className="web-name">
          FastFashion Bids
        </NavLink>
        <div className="nav-text">
          <NavLink style={ActiveLink} to={"/home/" + params.id}>
            Home
          </NavLink>
          {/* <NavLink style={ActiveLink} to={"/auction/" + params.id}>
            Auction
          </NavLink> */}
          <NavLink style={ActiveLink} to={"/exchange/" + params.id}>
            Exchange
          </NavLink>
          <NavLink style={ActiveLink} to={"/my/store/" + params.id}>
            My Store
          </NavLink>
        </div>
        <div className="editprofile">
          <NavLink style={ActiveLink} to={"/edit/profile/" + params.id}>
            <img src={data.img} alt="Image-User" />
          </NavLink>
          <NavLink to={"/"}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menuauth;
