import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleChange } from '../../commons';
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Register() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "upload");


      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
          data, { withcredentials: false }
        );

        const { url } = uploadRes.data;

        const newUser = {
          ...info,
          profilePicture: url,
        };

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, newUser, {withcredentials: true})
        if(res.data.status === 'success') {
          toast.success("Registered Successfully!");
        }
        
      } catch (err) {
        setLoading(false);
        const errorMessage = err.response?.data?.message || "Failed to register. Please try again.";
        toast.error(errorMessage);
        console.error(err);
        throw err;
      }
    } else {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, info, {withcredentials: true})
        if(res.data.status === 'success') {
          toast.success("Registered Successfully!");
        }
      } catch (err) {
        setLoading(false);
        const errorMessage = err.response?.data?.message || "Failed to register. Please try again.";
        toast.error(errorMessage);
        console.error(err);
        throw err;
      }
    }
    setLoading(false);
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
