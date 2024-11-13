import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleChange } from '../../commons';
import { useAuth } from "../../context/authContext";
import { ClipLoader } from "react-spinners";
import { register } from "../../apis/usePost";

function Register() {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await register(file, info);
      console.log(res)
      if(res.data.status === 'success') {
        login(res.data.user);
        navigate("/");
      }
    }
    catch (err) {
      setLoading(false);
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>

          <form>
            <div className="image">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                height="100px"
              />

              <div className="txt_field_img">
                <label htmlFor="file">
                  Image <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="formInput">


              <div className="txt_field">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={(e) => handleChange(e, setInfo)}
                  id="username"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={(e) => handleChange(e, setInfo)}
                  id="email"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={(e) => handleChange(e, setInfo)}
                  id="password"
                  //   value={data.password}
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="confirm your password"
                  name="passwordConfirm"
                  onChange={(e) => handleChange(e, setInfo)}
                  id="passwordConfirm"
                  //   value={data.password}
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="text"
                  placeholder="Write bio"
                  name="desc"
                  onChange={(e) => handleChange(e, setInfo)}
                  id="desc"
                //   value={data.desc}
                />
              </div>
            </div>
              {loading && <div className="post-loader" style={{color: "black", marginBottom: "20px"}}>
                <ClipLoader color="black" size={30} />
                  creating your account...
                </div>
              }
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already Registered? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
