import React, { useEffect, useState } from "react";

// Import Style Css
import "../css/products.css";

// Import Data
import { getExchange } from "../../api/exchange";

// Import Package
import { HashLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const params =  useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData();
      setLoading(false);
    }, 2000);
  }, []);

  const loadData = () => {
    getExchange()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  let state = 0;
  const option = (active) => {
    if (active == true) {
      state += 1;
    }

    if (state == 1) {
      document.getElementById("option").style.zIndex = "2";
      document.getElementById("option").style.width = "100%";
      document.getElementById("fa-sliders").style.color =
        "#e8175d";
      document.getElementById("content-sex").style.opacity = "1";
      document.getElementById("content-part").style.opacity = "1";
      document.getElementById("content-size").style.opacity = "1";
    } else if (state == 2) {
      document.getElementById("option").style.zIndex = "0";
      document.getElementById("option").style.width = "0%";
      document.getElementById("fa-sliders").style.color = "#111";
      document.getElementById("content-sex").style.opacity = "0";
      document.getElementById("content-part").style.opacity = "0";
      document.getElementById("content-size").style.opacity = "0";
      state = 0;
    }

    if (document.getElementById("men").checked == true) {
      document.getElementById("fa-person").style.backgroundColor = "#fff";
      document.getElementById("fa-person").style.color = "#111";
      document.getElementById("fa-person").style.scale = "1.1";
    } else if (document.getElementById("men").checked == false) {
      document.getElementById("fa-person").style.background = "none";
      document.getElementById("fa-person").style.color = "#fff";
      document.getElementById("fa-person").style.scale = "1";
    }

    if (document.getElementById("women").checked == true) {
      document.getElementById("fa-person-dress").style.backgroundColor = "#fff";
      document.getElementById("fa-person-dress").style.scale = "1.1";
      document.getElementById("fa-person-dress").style.color = "#111";
    } else if (document.getElementById("women").checked == false) {
      document.getElementById("fa-person-dress").style.background = "none";
      document.getElementById("fa-person-dress").style.color = "#fff";
      document.getElementById("fa-person-dress").style.scale = "1";
    }

    if (document.getElementById("shirt").checked == true) {
      document.getElementById("h4-shirt").style.backgroundColor = "#fff";
      document.getElementById("h4-shirt").style.color = "#111";
      document.getElementById("h4-shirt").style.scale = "1.1";
    } else if (document.getElementById("shirt").checked == false) {
      document.getElementById("h4-shirt").style.background = "none";
      document.getElementById("h4-shirt").style.color = "#fff";
      document.getElementById("h4-shirt").style.scale = "1";
    }

    if (document.getElementById("trousers").checked == true) {
      document.getElementById("h4-trousers").style.backgroundColor = "#fff";
      document.getElementById("h4-trousers").style.color = "#111";
      document.getElementById("h4-trousers").style.scale = "1.1";
    } else if (document.getElementById("trousers").checked == false) {
      document.getElementById("h4-trousers").style.background = "none";
      document.getElementById("h4-trousers").style.color = "#fff";
      document.getElementById("h4-trousers").style.scale = "1";
    }

    if (document.getElementById("S").checked == true) {
      document.getElementById("label-s").style.backgroundColor = "#fff";
      document.getElementById("label-s").style.color = "#111";
      document.getElementById("label-s").style.scale = "1.1";
    } else if (document.getElementById("S").checked == false) {
      document.getElementById("label-s").style.background = "none";
      document.getElementById("label-s").style.color = "#fff";
      document.getElementById("label-s").style.scale = "1";
    }

    if (document.getElementById("M").checked == true) {
      document.getElementById("label-m").style.backgroundColor = "#fff";
      document.getElementById("label-m").style.color = "#111";
      document.getElementById("label-m").style.scale = "1.1";
    } else if (document.getElementById("M").checked == false) {
      document.getElementById("label-m").style.background = "none";
      document.getElementById("label-m").style.color = "#fff";
      document.getElementById("label-m").style.scale = "1";
    }

    if (document.getElementById("L").checked == true) {
      document.getElementById("label-l").style.backgroundColor = "#fff";
      document.getElementById("label-l").style.color = "#111";
      document.getElementById("label-l").style.scale = "1.1";
    } else if (document.getElementById("L").checked == false) {
      document.getElementById("label-l").style.background = "none";
      document.getElementById("label-l").style.color = "#fff";
      document.getElementById("label-l").style.scale = "1";
    }

    if (document.getElementById("XL").checked == true) {
      document.getElementById("label-xl").style.backgroundColor = "#fff";
      document.getElementById("label-xl").style.color = "#111";
      document.getElementById("label-xl").style.scale = "1.1";
    } else if (document.getElementById("XL").checked == false) {
      document.getElementById("label-xl").style.background = "none";
      document.getElementById("label-xl").style.color = "#fff";
      document.getElementById("label-xl").style.scale = "1";
    }
  };

  const checkauth = (id_exchange, id) => {
    if (id != undefined) {
      navigate("/view/exchange/" + id_exchange + "/" + id)
    } else {
      navigate("/view/exchange/" + id_exchange + "/no-login")
    }
  }

  return (
    <div className="container-products">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="content-products">
          <div className="text-exchange">
            <h1>Exchange</h1>
          </div>
          <div className="show-exchange">
            {/* <i
              className="fa-solid fa-sliders"
              id="fa-sliders"
              onClick={() => option(true)}
            ></i> */}
            <div id="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </div>
            <div className="option" id="option">
              <div className="sex">
                <div className="content-sex" id="content-sex">
                  <h3 onClick={() => option("clear-sex")}>Sex:</h3>
                  <div className="label-men">
                    <label htmlFor="men">
                      <i className="fa-solid fa-person" id="fa-person"></i>
                    </label>
                    <input
                      type="checkbox"
                      id="men"
                      value="men"
                      onClick={() => option()}
                    />
                  </div>
                  <div className="label-women">
                    <label htmlFor="women">
                      <i
                        className="fa-solid fa-person-dress"
                        id="fa-person-dress"
                      ></i>
                    </label>
                    <input
                      type="checkbox"
                      id="women"
                      value="women"
                      onClick={() => option()}
                    />
                  </div>
                </div>
              </div>
              <div className="part">
                <div className="content-part" id="content-part">
                  <h3 onClick={() => option("clear-part")}>Part:</h3>
                  <div className="shirt">
                    <label htmlFor="shirt">
                      <h4 id="h4-shirt">Shirt</h4>
                    </label>
                    <input
                      type="checkbox"
                      id="shirt"
                      onClick={() => option()}
                    />
                  </div>
                  <div className="trousers">
                    <label htmlFor="trousers">
                      <h4 id="h4-trousers">Trousers</h4>
                    </label>
                    <input
                      type="checkbox"
                      id="trousers"
                      onClick={() => option()}
                    />
                  </div>
                </div>
              </div>
              <div className="size">
                <div className="content-size" id="content-size">
                  <h3 onClick={() => option("clear-size")}>Size:</h3>
                  <div className="s">
                    <label htmlFor="S" id="label-s">
                      S
                    </label>
                    <input type="checkbox" id="S" onClick={() => option()} />
                  </div>
                  <div className="m">
                    <label htmlFor="M" id="label-m">
                      M
                    </label>
                    <input type="checkbox" id="M" onClick={() => option()} />
                  </div>
                  <div className="l">
                    <label htmlFor="L" id="label-l">
                      L
                    </label>
                    <input type="checkbox" id="L" onClick={() => option()} />
                  </div>
                  <div className="xl">
                    <label htmlFor="XL" id="label-xl">
                      XL
                    </label>
                    <input type="checkbox" id="XL" onClick={() => option()} />
                  </div>
                </div>
              </div>
            </div>
            {data
              .filter((item) => {
                return search.toLowerCase() == ""
                  ? item
                  : item.exchange_name.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <div className="box" key={index}>
                    <div className="image-exchange">
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
                      <button onClick={() => checkauth(item.id_exchange, params.id)}>{item.exchange_name}</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
