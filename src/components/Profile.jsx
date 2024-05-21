import React, { useEffect, useState } from "react";

// Import Data
import { read, update } from "../../api/user";

// Import Style Css
import "../css/profile.css";

// Import Component
import Menu from "../tools/Menuauth";

// Import Package
import { HashLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [fileold, setFileOld] = useState();
  // const [form, setForm] = useState({});
  const [data, setData] = useState({
    img: "",
    fname: "",
    lname: "",
    tel: "",
    address: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData(params.id);
      setLoading(false);
    }, 2000);
  }, [params.id]);

  const loadData = (id) => {
    read(id)
      .then((res) => {
        setData(res.data.data[0]);
        setFileOld(res.data.file);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name == "img") {
      if (e.target.value != undefined) {
        document.getElementById("Img").style.display = "none";
        document.getElementById("fa-image").style.display = "flex";
      }
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formWithImage = new FormData();
    for (const key in data) {
      formWithImage.append(key, data[key]);
    }
    formWithImage.append("img", fileold);
    update(params.id, formWithImage).then((res) => {
      if (res.data.message == "success") {
        alert("Edit Profile Success");
        navigate("/home/" + params.id);
      } else {
        alert("Error");
      }
    });
  };

  const cancel = (active) => {
    if (active) {
      navigate("/home/" + params.id);
    }
  };
  return (
    <div className="container-profile">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="profile">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-profile">
            <form onSubmit={handleSubmit}>
              <div className="text-head">
                <h1>Edit Profile</h1>
              </div>{" "}
              <br /> <br />
              <div className="image">
                <label htmlFor="img">
                  <img src={data.img} alt="Image-Profile" id="Img"/>
                  <i className="fa-solid fa-image" id="fa-image"></i>
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={(e) => handleChange(e)}
                />
              </div>{" "}
              <br />
              <div className="name">
                <div className="fname">
                  <label htmlFor="fname">First Name:</label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={data.fname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type here"
                  />
                </div>
                <div className="lname">
                  <label htmlFor="lname">Surname:</label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    value={data.lname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type here"
                  />
                </div>
              </div>{" "}
              <br />
              <div className="tel-addr">
                <div className="tel">
                  <label htmlFor="tel">Tel:</label>
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    value={data.tel}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type here"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="addr">
                  <label htmlFor="addr">Address:</label>
                  <textarea
                    name="address"
                    id="addr"
                    value={data.address}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type here"
                  ></textarea>
                </div>
              </div>{" "}
              <br /> <br />
              <div className="button-cancel-submit">
                <button type="reset" onClick={() => cancel(true)} className="cancel">Cancel</button>
                <button type="submit" className="sum">Done</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
