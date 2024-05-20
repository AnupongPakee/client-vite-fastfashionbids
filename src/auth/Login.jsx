import React, { useEffect, useState } from "react";

import image from "../assets/images/login.jpg";

import { login } from "../../api/auth";

// Import Style Css
import "../css/login.css";

// Import Package
import { HashLoader } from "react-spinners";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form)
      .then((res) => {
        if (res.data.message == "no user found") {
          alert("No User Found");
        } else if (res.data.message == "login failed") {
          alert("Wrong Password");
        } else if (res.data.message == "adminlogin success") {
          navigate("/admin/" + res.data.id)
        } else {
          navigate("/home/" + res.data.id);
        }
      })
      .catch((err) => console.log(err));
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
  return (
    <div className="container-login">
      {loading ? (
        <HashLoader color="#e8175d" />
      ) : (
        <div className="content-login">
          <div className="menu">
            <NavLink to={"/"}>FastFashion Bids</NavLink>
          </div>
          <div className="image-left">
            <img src={image} alt="Image-Login" />
            <h1>Login</h1>
            <a href="https://www.freepik.com/free-ai-image/fast-fashion-concept-with-full-clothing-store_72616791.htm">Ref: https://www.freepik.com/free-ai-image/fast-fashion-concept-with-full-clothing-store_72616791.htm</a>
          </div>
          <div className="form-right">
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
              <div className="button">
                <button type="submit">Login</button>
              </div>{" "}
              <br />
              <div className="width-line">
                <div className="line"></div>
              </div>{" "}
              <br />
              <div className="link-sign-up">
                <p>Need an account?</p>
                <Link to={"/register"}>Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
