/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";

// Import Data
import { viewExchange, sendId } from "../../api/exchange";
import { readStore } from "../../api/store";
import { addList, readList } from "../../api/listexchange";
import { addComment, readComment } from "../../api/comment";

// Import Style Css
import "../css/viewexchange.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useParams } from "react-router-dom";

function Viewexchange() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [mystore, setMystore] = useState([]);
  const [listname, setListname] = useState([]);
  const [comment, setComment] = useState({});
  const [commentxt, setCommentxt] = useState([]);
  const { id_ex, id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(id_ex, id);
      loadMystore(id);
      loadListname(id_ex);
      loadComment(id_ex);
      setLoading(false);
    }, 2000);
  }, [id_ex, id]);

  const loadData = (id_ex, id) => {
    viewExchange(id_ex, id)
      .then((res) => {
        setData(res.data.exchange[0]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadMystore = (id) => {
    readStore(id)
      .then((res) => {
        setMystore(res.data.data);
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

  const loadComment = (id_ex) => {
    readComment(id_ex)
      .then((res) => {
        setCommentxt(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const history_data = {
      h_fname: data.fname,
      h_lname: data.lname,
      h_store_name: data.exchange_name,
      h_address: data.address,
      tel: data.tel
    };
    sendId(id, history_data)
      .then((res) => {
        console.log("Add success");
      })
      .catch((err) => console.log(err))
    addList(id, id_ex, form)
      .then((res) => {
        if (res.data.message == "Store added successfully") {
          loadListname(id);
          alert("Add List Success");
        } else if (res.data.message == "This id has already posted") {
          alert("This id has already posted");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    addComment(id_ex, id, comment)
      .then((res) => {
        loadComment(id_ex);
        console.log("add submit");
      })
      .catch((err) => console.log(err));
  };

  const showForm = (check) => {
    if (check == "show") {
      document.getElementById("form").style.display = "flex";
      document.getElementById("form").style.height = "300px";
    } else if (check == "cancel") {
      document.getElementById("form").style.display = "none";
    }
  };

  return (
    <div className="container-view-exchange">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="view-exchange">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-view-exchange">
            <div className="detail-left">
              <div className="image">
                <a href={data.exchange_img} target="__blank">
                  <img src={data.exchange_img} alt="Image-Exchange" />
                </a>
              </div>
              <div className="line-width">
                <div className="line"></div>
                <div className="form-add" id="form">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="id_store">My Store: </label>
                    <select
                      name="id_store"
                      id="id_store"
                      onChange={(e) => handleChange(e)}
                      defaultValue={"null"}
                      required
                    >
                      <option value="null">Please Select</option>
                      {mystore.map((item, index) => {
                        return (
                          <option value={item.id_store} key={index}>
                            {item.store_name}
                          </option>
                        );
                      })}
                    </select>{" "}
                    <br />
                    <p>
                      If you don't have a product yet, add it here{" "}
                      <NavLink to={"/my/store/" + id}>click</NavLink>
                    </p>
                    <button className="sum" type="submit">
                      Done
                    </button>
                    <button
                      className="can"
                      type="reset"
                      onClick={() => showForm("cancel")}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
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
                  <h4>Color: {data.exchange_color}</h4> <br />
                  <h4>Detail: {data.exchange_detail}</h4>
                </div>
              </div>{" "}
              <br />
              <button
                className="btn-exchange"
                id="btn-exchange"
                onClick={() => showForm("show")}
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
                {commentxt.map((item, index) => {
                  return (
                    <div className="comment-text" key={index}>
                      <h3>
                        {item.username}: {item.comment}
                      </h3>
                    </div>
                  );
                })}
                <form onSubmit={handleSubmitComment}>
                  <label htmlFor="comment">Comment: </label>
                  <input
                    type="text"
                    name="comment"
                    placeholder="Comment"
                    onChange={(e) => handleComment(e)}
                    id="comment"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewexchange;
