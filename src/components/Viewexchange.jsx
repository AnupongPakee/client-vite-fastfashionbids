import React, { useEffect, useState } from "react";

// Import Data
import { viewExchange } from "../../api/exchange";

// Import Style Css
import "../css/viewexchange.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Package
import { HashLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function Viewexchange() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id_ex, id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(id_ex, id);
      setLoading(false);
    }, 3000);
  }, [id_ex, id]);

  const loadData = (id_ex, id) => {
    viewExchange(id_ex, id)
      .then((res) => {
        setData(res.data.exchange[0]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-view-exchange">
      {loading ? (
        <HashLoader color="#d636d5" />
      ) : (
        <div className="view-exchange">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-view-exchange">
            <div className="detail-left">
              <div className="image">
                <img src={data.exchange_img} alt="Image-Exchange" />
              </div>
              <div className="line-width">
                <div className="line"></div>
              </div>
              <div className="title-name">
                <h1>{data.exchange_name}</h1>
              </div>
              <div className="detail">
                <div className="text">
                  <h3>Part: {data.typename}</h3>
                  <h3>Sex: {data.sexname}</h3>
                  <h3>Size: {data.sizes}</h3>
                  <h3>Detail: {data.exchange_detail}</h3>
                </div>
              </div>
            </div>
            <div className="detail-right">
              <div className="list-name">
                <div className="name">
                  <h3>List Name</h3>
                  <div className="list">
                    <div className="name1">
                      <p>1 .Anupong</p>
                    </div>
                    <div className="name1">
                      <p>2. Okbook</p>
                    </div>
                    <div className="name1">
                      <p>3. Mrnu</p>
                    </div>
                    <div className="name1">
                      <p>4. OhNooooo</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line-width">
                <div className="line"></div>
              </div> <br />
              <h3>Comment</h3>
              <div className="comment"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewexchange;
