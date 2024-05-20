import React, { useEffect, useState } from "react";

import Image from "../assets/images/home.jpg"

// Import Data
import { readExchange, addExchange, deleteExchange } from "../../api/exchange";
import { readList } from "../../api/listexchange";

// Import Style Css
import "../css/exchange.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Exchange() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [fileold, setFileOld] = useState();
  const [listname, setListname] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(params.id);
      loadListname(params.id);
      setLoading(false);
    }, 3000);
  }, []);

  const loadData = () => {
    readExchange(params.id)
      .then((res) => {
        setData(res.data.data);
        setFileOld(res.data.file);
      })
      .catch((err) => console.log(err));
  };

  const loadListname = (id) => {
    readList(id)
      .then((res) => {
        setListname(res.data.store);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name == "exchange_img") {
      if (e.target.value != undefined) {
        document.getElementById("fa-image").style.backgroundColor = "#111";
        document.getElementById("fa-image").style.color = "#edeae5";
      }
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRemove = (id_ex) => {
    deleteExchange(params.id, id_ex)
      .then((res) => {
        if (res.data.message == "success") {
          loadData();
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formWithImage = new FormData();
    for (const key in form) {
      formWithImage.append(key, form[key]);
    }
    formWithImage.append("img", fileold);
    addExchange(params.id, formWithImage)
      .then((res) => {
        if (res.data.message == "success");
        alert("Add success");
        document.getElementById("form-add").style.width = "0%";
        document.getElementById("form").style.opacity = "0";
        document.getElementById("form").style.display = "none";
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const ActiveNavLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#111" : "#edeae5",
      color: isActive ? "#edeae5" : "#111"
    };
  };

  const showForm = (active) => {
    if (active == true) {
      document.getElementById("form-add").style.width = "100%";
      document.getElementById("form").style.opacity = "1";
      document.getElementById("form").style.display = "grid";
    } else if (active == false) {
      document.getElementById("form-add").style.width = "0%";
      document.getElementById("form").style.opacity = "0";
      document.getElementById("form").style.display = "none";
    }
  };

  const showDetail = (check, id) => {
    if (check == "show") {
      document.getElementById("detail").style.width = "100%";
      document.getElementById("detail").style.display = "flex";
      loadListname(id)
    } else if (check == "cancel") {
      document.getElementById("detail").style.display = "none";
    }
  };

  const showView = (check) => {
    if (check == "show") {
      document.getElementById("content-view").style.display = "none";
      document.getElementById("view").style.display = "flex";
    } else if (check == "cancel") {
      document.getElementById("content-view").style.display = "flex";
      document.getElementById("view").style.display = "none";
    }
  }

  return (
    <div className="container-exchange">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="exchange">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-exchange">
            <div className="view-list-name" id="detail">
              <i
                className="fa-solid fa-xmark"
                onClick={() => showDetail("cancel")}
              ></i>
              <div className="view-left">
                <div className="view" id="view">
                  <h3 className="h3-view">In Development</h3>
                  <div className="box">
                    <div className="detail">
                      {/* <div className="image">
                        <img src={Image} alt="Image" />
                      </div> <br />
                      <div className="name">
                        <h2>Shirt</h2>
                      </div>
                      <div className="type-name">
                        <h3>Part: Shirt</h3>
                        <h3>Size: L</h3>
                        <h3>Sexname: Men</h3>
                        <h3>Detail: Test Shirt</h3>
                      </div> */}
                      <h1>In Development</h1>
                      <button className="button-select">Select</button>
                      <button className="button-cancel" type="reset" onClick={() => showView("cancel")}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div className="content-view" id="content-view">
                  <h3>Comment</h3>
                  <div className="list-comment">
                    <p>In Development</p>
                  </div>
                </div>
              </div>
              <div className="list-right">
                <div className="content-list">
                  <h3>List Name</h3>
                  <div className="list-name">
                    {listname.map((item, index) => {
                      return (
                        <div className="name-button" key={index}>
                          <h2>{item.fname} {item.lname}</h2>
                          <div className="button">
                            <button onClick={() => showView("show")}>View</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
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
              </div>
            </div>
            <div className="show-products">
              <div className="content-show">
                <div className="form-add-product" id="form-add">
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="label">
                      <label htmlFor="name">Product Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="exchange_name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="brand">Brand Name:</label>
                      <input
                        type="text"
                        id="brand"
                        name="exchange_brand"
                        onChange={(e) => handleChange(e)}
                        placeholder="Brand Name"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="color">Color Name:</label>
                      <input
                        type="text"
                        id="color"
                        name="exchange_color"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="detail">Detail:</label>
                      <input
                        style={{ width: "200px" }}
                        type="text"
                        name="exchange_detail"
                        id="detail"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label want">
                      <label htmlFor="want">Want:</label>
                      <input
                        style={{ width: "200px" }}
                        type="text"
                        name="exchange_want"
                        id="want"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="image">
                        <i className="fa-solid fa-image" id="fa-image"></i>
                      </label>
                      <input
                        type="file"
                        name="exchange_img"
                        onChange={(e) => handleChange(e)}
                        id="image"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="id_size">Size:</label>
                      <select
                        name="id_size"
                        id="id_size"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="null" defaultValue={"null"}>
                          Pleasse Select
                        </option>
                        <option value="72e46835-f4d4-4774-a608-b1ccee120832">
                          S
                        </option>
                        <option value="68d89fbf-7e52-49b8-9679-a5b564277269">
                          M
                        </option>
                        <option value="f35f0ce3-21fe-4624-951e-d88c23016ca9">
                          L
                        </option>
                        <option value="9fb88457-730e-4112-ba77-5b5c0f239994">
                          XL
                        </option>
                      </select>
                    </div>
                    <div className="label">
                    <label htmlFor="id_size">Sex:</label>
                      <select
                        name="id_sex"
                        id="id_sex"
                        defaultValue={"null"}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="null">Please Select</option>
                        <option value="02e77254-1fc9-4e10-9913-716be2bc33db">
                          Men
                        </option>
                        <option value="0c6a2298-f32f-4b2b-accd-4b68c7a06454">
                          Women
                        </option>
                      </select>
                    </div>
                    <div className="label">
                    <label htmlFor="id_size">Part:</label>
                      <select
                        name="id_type"
                        id="id_type"
                        defaultValue={"null"}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="null">Please Select</option>
                        <option value="ce645324-96e0-4bac-a2d1-fa30252ee989">
                          Shirt
                        </option>
                        <option value="6c7a18ab-a568-4fe3-a332-e62ef7272c77">
                          Trouser
                        </option>
                      </select>
                    </div>
                    <div className="label"></div>
                    <button type="reset" onClick={() => showForm(false)}>
                      Cancel
                    </button>
                    <button type="submit">Done</button>
                  </form>
                </div>
                <div className="box-add-product">
                  <i
                    className="fa-solid fa-plus"
                    onClick={() => showForm(true)}
                  ></i>
                </div>
                {data.map((item, index) => {
                  return (
                    <div className="box" key={index}>
                      <div className="image-exchange">
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => handleRemove(item.id_exchange)}
                        ></i>
                        <img src={item.exchange_img} alt="Image-Exchange" />
                      </div>
                      <div className="detail">
                        <div className="type">
                          <p>{item.sizes}</p>
                          <p>{item.typename}</p>
                          <p>{item.sexname}</p>
                          <p>Exchange</p>
                        </div>
                      </div>
                      <div className="exchange-name">
                        <button onClick={() => showDetail("show", item.id_exchange)}>
                          {item.exchange_name}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exchange;
