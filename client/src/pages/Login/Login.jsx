import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleChange } from "../../commons";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Login({ title, link }) {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials, { withCredentials: true });
      if(data.status === "success") {
        login(data.user);
        toast.success("You have logged in successfully!");
        navigate(`${link}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to log in. Please try again.";
      toast.error(errorMessage);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
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
            {loading && <div className="post-loader" style={{color: "black", marginBottom: "20px"}}>
                <ClipLoader color="black" size={30} />
                  logging in...
                </div>
              }
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
