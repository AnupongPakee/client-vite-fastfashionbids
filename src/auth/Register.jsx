import React, { useEffect, useState } from "react";

import image from "../assets/images/register.jpg";

import { register } from "../../api/auth";

// Import Style CSS
import "../css/register.css";

// Import Package
import { HashLoader } from "react-spinners";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password != form.passwordconfirm) {
      alert("Wrong Password");
    } else {
      register(form)
        .then((res) => {
          if (res.data.message == "success") {
            alert("Register Success");
            navigate("/home/" + res.data.id);
          } else if (res.data.message == "haved username") {
            alert("Already have a username?");
          } else if (res.data.message == "haved email") {
            alert("Already have an email?");
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  let state = false;
  const showpass = () => {
    if (state) {
      document.getElementById("password").setAttribute("type", "password");
      document.getElementById("eye-slash").style.display = "none";
      document.getElementById("eye").style.display = "block";
      state = false;
    } else {
      document.getElementById("password").setAttribute("type", "text");
      document.getElementById("eye-slash").style.display = "block";
      document.getElementById("eye-slash").style.color = "#acacac";
      document.getElementById("eye").style.display = "none";
      state = true;
    }
  };

  let state2 = false;
  const showpassconfirm = () => {
    if (state2) {
      document
        .getElementById("password-confirm")
        .setAttribute("type", "password");
      document.getElementById("eye-slash-cfm").style.display = "none";
      document.getElementById("eye-cfm").style.display = "block";
      state2 = false;
    } else {
      document.getElementById("password-confirm").setAttribute("type", "text");
      document.getElementById("eye-slash-cfm").style.display = "block";
      document.getElementById("eye-slash-cfm").style.color = "#acacac";
      document.getElementById("eye-cfm").style.display = "none";
      state2 = true;
    }
  };
  return (
    <div className="container-register">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="content-register">
          <div className="menu">
            <NavLink to={"/"}>FastFashion Bids</NavLink>
          </div>
          <div className="form-left">
            <form onSubmit={handleSubmit}>
              <div className="username">
                <label htmlFor="username">
                  <i className="fa-solid fa-user" title="Username"></i>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => handleChange(e)}
                  placeholder="Username"
                />
              </div>{" "}
              <br />
              <div className="password">
                <label htmlFor="password">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => handleChange(e)}
                  placeholder="Password"
                />
                <i
                  className="fa-regular fa-eye"
                  id="eye"
                  onClick={() => showpass()}
                ></i>
                <i
                  className="fa-regular fa-eye-slash"
                  id="eye-slash"
                  onClick={() => showpass()}
                  style={{ display: "none" }}
                ></i>
              </div>{" "}
              <br />
              <div className="password">
                <label htmlFor="password-confirm">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="password"
                  name="passwordconfirm"
                  id="password-confirm"
                  onChange={(e) => handleChange(e)}
                  placeholder="Confirm"
                />
                <i
                  className="fa-regular fa-eye"
                  id="eye-cfm"
                  onClick={() => showpassconfirm()}
                ></i>
                <i
                  className="fa-regular fa-eye-slash"
                  id="eye-slash-cfm"
                  onClick={() => showpassconfirm()}
                  style={{ display: "none" }}
                ></i>
              </div>{" "}
              <br />
              <div className="email">
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => handleChange(e)}
                  placeholder="Email"
                />
              </div>
              <br />
              <div className="button">
                <button type="submit">Login</button>
              </div>{" "}
            </form>
          </div>
          <div className="image-right">
            <img src={image} alt="Image-Login" />
            <h1>Register</h1>
            <a href="https://www.freepik.com/free-ai-image/fast-fashion-concept-with-piles-clothes_72616134.htm">
              Ref:
              https://www.freepik.com/free-ai-image/fast-fashion-concept-with-piles-clothes_72616134.htm
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
