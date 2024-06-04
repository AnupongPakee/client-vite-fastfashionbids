import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import Style Css
import "../css/admin.css";

// Import Data
import { viewUser, deleteUser } from "../../api/admin";
import { readReport } from "../../api/report";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

function Admin() {
  const [data, setData] = useState([]);
  const [mereport, setMeReport] = useState([]);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(params.id);
      setLoading(false);
    }, 2000);
  }, []);

  const loadData = () => {
    viewUser(params.id)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const loadReport = (id_me) => {
    readReport(id_me)
      .then((res) => {
        setReport(res.data.meReport[0]);
        setMeReport(res.data.userReport[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (id) => {
    deleteUser(id)
      .then((res) => {
        if (res.data.message == "success") {
          loadData();
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch((err) => console.log(err));
  };

  const showReport = (check, id) => {
    if (check == "show") {
      loadReport(id);
      document.getElementById("report").style.display = "flex";
      document.getElementById("report").style.zIndex = "1";
      document.getElementById("h2").style.opacity = "0";
    } else {
      document.getElementById("report").style.display = "none";
      document.getElementById("report").style.zIndex = "0";
      document.getElementById("h2").style.opacity = "1";
    }
  };
  return (
    <div className="container-admin">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="admin">
          <div className="menu">
            <div className="content-menu">
              <h1>FastFashion Bids</h1>
              <NavLink to={"/"}>
                <i className="fa-solid fa-right-to-bracket"></i>
              </NavLink>
            </div>
          </div>
          <div className="content-admin">
            <h2 id="h2">Username List</h2>
            <div className="list-name">
              <div className="report" id="report">
                <div className="content-report">
                  <h3>Report</h3> <br /> <br />
                  <h3>User: {report.username} Reported {mereport.username}</h3> <br />
                  <h3>Detail: {mereport.content}</h3> <br /> <br />
                  <div className="button">
                    <button type="reset" onClick={() => showReport("cancel")}>Cancel</button>
                    <button onClick={() => handleRemove(mereport.id_me)}>Delete</button>
                  </div>
                </div>
              </div>
              {data.map((item, index) => {
                return (
                  <div className="box" key={index}>
                    <div className="image">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="text">
                      <h3>
                        {" "}
                        <i
                          className="fa-solid fa-user"
                          title="Username"
                        ></i>: {item.username}
                      </h3>{" "}
                      <br />
                      <div className="flname">
                        <h3>{item.fname}</h3>
                        <h3>{item.lname}</h3>
                      </div>
                    </div>
                    <div className="button">
                      <button
                        className="view"
                        onClick={() => showReport("show", item.id)}
                      >
                        View
                      </button>
                      <button onClick={() => handleRemove(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
