import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleChange } from "../../commons";
import { useAuth } from "../../context/authContext";

function Login({ title, link }) {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials, { withCredentials: true });
      console.log(data)
      if(data.status === "success") {
        setUser(data.user);
        navigate(`${link}`);
      }
      else {
        console.error("Login failed:", data.message);
      }
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>{title}</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                placeholder="please enter your email"
                id="email"
                onChange={(e) => handleChange(e, setCredentials)}
                className="lInput"
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={(e) => handleChange(e, setCredentials)}
                className="lInput"
              />
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Login
              </button>
            </div>
            <div className="signup_link">
              <p>
                Not registered? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
