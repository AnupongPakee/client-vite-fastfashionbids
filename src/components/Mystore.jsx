import React, { useEffect, useState } from "react";

// Import Data
import { readStore, addStore, deleteStore } from "../../api/store";

// Import Style Css
import "../css/mystore.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useParams } from "react-router-dom";

function Mystore() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [fileold, setFileOld] = useState();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(params.id);
      setLoading(false);
    }, 2000);
  }, []);

  const loadData = () => {
    readStore(params.id)
      .then((res) => {
        setData(res.data.data);
        setFileOld(res.data.file);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "store_img") {
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

  const handleRemove = (id_st) => {
    deleteStore(params.id, id_st)
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
    addStore(params.id, formWithImage)
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
      color: isActive ? "#edeae5" : "#111",
    };
  };

  const showForm = (active) => {
    if (active) {
      document.getElementById("form-add").style.width = "100%";
      document.getElementById("form").style.opacity = "1";
      document.getElementById("form").style.display = "grid";
    }
  };

  const cancel = (active) => {
    if (active) {
      document.getElementById("form-add").style.width = "0%";
      document.getElementById("form").style.opacity = "0";
      document.getElementById("form").style.display = "none";
    }
  };

  return (
    <div className="container-mystore">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="mystore">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-mystore">
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
            <div className="show-products">
              <div className="content-show">
                <div className="form-add-product" id="form-add">
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="label">
                      <label htmlFor="name">Product Name:</label>
                      <input
                        type="text"
                        name="store_name"
                        id="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="brand">Brand Name:</label>
                      <input
                        type="text"
                        name="store_brand"
                        id="brand"
                        onChange={(e) => handleChange(e)}
                        placeholder="Brand Name"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="color">Color`:</label>
                      <input
                        type="text"
                        name="store_color"
                        id="color"
                        onChange={(e) => handleChange(e)}
                        placeholder="Type here"
                      />
                    </div>
                    <div className="label">
                      <label htmlFor="detail">Detail:</label>
                      <input
                        style={{ width: "200px" }}
                        type="text"
                        name="store_detail"
                        id="detail"
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
                        name="store_img"
                        id="image"
                        onChange={(e) => handleChange(e)}
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
                    <button type="reset" onClick={() => cancel(true)}>
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
                      <div className="image-mystore">
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => handleRemove(item.id_store)}
                        ></i>
                        <a href={item.store_img} target="__blank">
                          <img src={item.store_img} alt="Image-mystore" />
                        </a>
                      </div>
                      <div className="detail">
                        <div className="type">
                          <p>{item.sizes}</p>
                          <p>{item.typename}</p>
                          <p>{item.sexname}</p>
                          <p>My Store</p>
                        </div>
                      </div>
                      <div className="mystore-name">
                        <p>{item.store_name}</p>
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

export default Mystore;
