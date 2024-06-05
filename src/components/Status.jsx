import React, { useEffect, useState } from "react";

// Import Style Css
import "../css/status.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Data
import { getAddr } from "../../api/exchange";
import { addReport } from "../../api/report";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useParams } from "react-router-dom";

function Status() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const params = useParams();

  const defaultData = [
    {
      h_fname: "",
      h_lname: "",
      h_store_name: "",
      h_address: "",
      tel: "",
      id_user: ""
    }
  ]

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
        if (res.data.data.length > 0) {
          setData(res.data.data[0]);
          console.log(res.data.data[0]);
        } else {
          setData(defaultData);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    addReport(data.id_user, data.id_me, form)
      .then((res) => {
        console.log("add report success");
        alert("Add report success")
      })
      .catch((err) => console.log(err));
  };

  const ActiveNavLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#111" : "#edeae5",
      color: isActive ? "#edeae5" : "#111",
    };
  };

  const showForm = (check) => {
    if (check == "show") {
      document.getElementById("form").style.display = "flex";
    } else {
      document.getElementById("form").style.display = "none";
    }
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
                    History
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="show-status">
              <div
                className="text"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <p>
                  Name <br /> {data.h_fname} {data.h_lname}
                </p>
                <p>
                  Tel <br /> {data.tel}
                </p>
                <p>
                  Address <br /> {data.h_address}
                </p>
                <p>
                  Product name <br /> {data.h_store_name}
                </p>
                <p>
                  Report <br />{" "}
                  <i
                    className="fa-solid fa-flag"
                    onClick={() => showForm("show")}
                  ></i>
                </p>
              </div>
              <form onSubmit={handleSubmit} id="form">
                <input
                  type="text"
                  name="content"
                  onChange={(e) => handleChange(e)}
                  placeholder="Report"
                />
                <button type="reset" onClick={() => showForm("cancel")}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
