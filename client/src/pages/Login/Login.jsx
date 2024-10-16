import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { handleChange } from "../../commons";

function Login({ title, link }) {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate(`${link}`);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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
                placeholder="username"
                id="username"
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
          {/* <form>
                        <div className="txt_field">
                            <input type="text" name="username" value={credentials.username} required onChange={(e) => handleChange(e, setInfo)} />
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="password" value={credentials.password} required onChange={(e) => handleChange(e, setInfo)} />
                            <label>Password</label>
                        </div>
                        <div className="pass">Forgot Password?</div>
                        <button onClick={handleClick}>Login</button>
                        <div className="signup_link">
                            Don't have an account? <a href="#">SignUp</a>
                        </div>
                    </form> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
