import React, { useEffect, useState } from "react";

// Import Data
import { viewExchange } from "../../api/exchange";
import { readList } from "../../api/listexchange";

// Import Component
import Menu from "../tools/Menu";

// Import Style Css
import "../css/viewexchangenl.css";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function Viewexchangenl() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [listname, setListname] = useState([]);
  const { id_ex, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(id_ex);
      loadListname(id_ex);
      setLoading(false);
    }, 2000);
  }, []);

  const loadData = (id_ex) => {
    viewExchange(id_ex)
      .then((res) => {
        setData(res.data.exchange[0]);
      })
      .catch((err) => console.log(err));
  };

  const loadListname = (id_ex) => {
    readList(id_ex)
      .then((res) => {
        setListname(res.data.store);
      })
      .catch((err) => console.log(err));
  };

  const checklogin = () => {
    navigate("/login");
  };

  return (
    <div className="container-view-exchange-nl">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="view-exchange-nl">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-view-exchange-nl">
            <div className="detail-left">
              <div className="image">
                <a href={data.exchange_img} target="__blank">
                  <img src={data.exchange_img} alt="Image-Exchange" />
                </a>
              </div>
              <div className="line-width">
                <div className="line"></div>
              </div>{" "}
              <br />
              <div className="text">
                <h2>{data.exchange_name}</h2>
              </div>
              <div className="detail">
                <div className="content-detail">
                  <h4>Part: {data.typename}</h4>
                  <h4>Size: {data.sizes}</h4>
                  <h4>Sex: {data.sexname}</h4>
                  <h4>Detail: {data.exchange_detail}</h4>
                </div>
              </div>{" "}
              <br />
              <button
                className="btn-exchange"
                id="btn-exchange"
                onClick={() => checklogin()}
              >
                Exchange
              </button>
            </div>
            <div className="detail-right">
              <div className="list-name">
                <div className="name">
                  <h3>List Name</h3>
                  <div className="list">
                    {listname.map((item, index) => {
                      return (
                        <p key={index}>
                          {index + 1}. {item.fname} {item.lname}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="line-width">
                <div className="line"></div>
              </div>{" "}
              <br />
              <div className="comment">
                <h2>Comment</h2>
                <h3>In Development</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewexchangenl;
