import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  //   const [data, setData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //     desc: "",
  //   });

  //   const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(file)
  console.log(info)
  //   const handleChange = ({ currentTarget: input }) => {
  //     setData({ ...data, [input.name]: input.value });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     data.append("file", file);
  //     data.append("upload_preset", "upload");
  //     try {
  //       const url = "http://localhost:7700/api/auth/register";
  //       const { data: res } = await axios.post(url, data);
  //       console.log(res.message);
  //       navigate("/login");
  //     } catch (error) {
  //       if (error.response.status >= 400 && error.response.status <= 500) {
  //         setError(error.response.data.message);
  //       }
  //     }
  //   };

  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>

          <form>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              height="100px"
            />
            <div className="formInput">
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
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
              id="username"
              //   value={data.username}
              required
            />

            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              id="email"
              //   value={data.email}
              required
            />

            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              id="password"
              //   value={data.password}
              required
            />

            <input
              type="text"
              placeholder="Write bio"
              name="desc"
              onChange={handleChange}
              id="desc"
            //   value={data.desc}
            />

            <button onClick={handleClick}>Register</button>
            <p>Already Registered? <Link to="/login">Login</Link></p>

          </form>
          {/* <form>
                        <div className="txt_field">
                            <input value={data.username || ""} onChange={handleChange} type="text" required />
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input value={data.email || ""} onChange={handleChange} type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="txt_field">
                            <input value={data.password || ""} onChange={handleChange} type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="txt_field">
                            <input value={data.desc || ""} onChange={handleChange} type="text" required />
                            <label>Bio</label>
                        </div>
                        {error && <div>{error}</div>}
                        <input onSubmit={handleSubmit} type="submit" class="button" value="Register" />
                        <div className="signup_link">
                            Already have an account? <Link to="/login">SignUp</Link>
                        </div>
                    </form> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
