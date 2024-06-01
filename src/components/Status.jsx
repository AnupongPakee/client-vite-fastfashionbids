import React, { useEffect, useState } from "react";

// Import Style Css
import "../css/status.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Data
import { getAddr } from "../../api/exchange";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useParams } from "react-router-dom";

function Status() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData();
      setLoading(false);
    }, 2000);
  }, []);

  const loadData = () => {
    getAddr(params.id)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const ActiveNavLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#111" : "#edeae5",
      color: isActive ? "#edeae5" : "#111",
    };
  };
  return (
    <div className="container-status">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="status">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-status">
            <div className="tool-left">
              <div className="content-tool">
                <div className="box">
                  <NavLink style={ActiveNavLink} to={"/exchange/" + params.id}>
                    Add Product Exchange
                  </NavLink>
                </div>
                {/* <div className="box">
                <NavLink style={ActiveNavLink} to={"/auction/" + params.id}>
                  Add Product Auction
                </NavLink>
              </div> */}
                <div className="box">
                  <NavLink style={ActiveNavLink} to={"/my/store/" + params.id}>
                    Add Product My Store
                  </NavLink>
                </div>
                <div className="box">
                  <NavLink style={ActiveNavLink} to={"/my/status/" + params.id}>
                    Status
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="show-status">
              <p>1. {data.fname} {data.lname} {data.tel}</p>
              <p>Address: {data.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
