import React, { useContext, useState } from "react";
import "./createPost.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import activities from "../Activity/activities"

function CreatePost() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
            data, { withcredentials: false }
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newpost = {
        ...info,
        userId: user._id,
        username: user.username,
        photos: list,
        rating: rating,
      };

      await axios.post("https://paradive-server.herokuapp.com/api/posts", newpost);
      // await axios.post("http://localhost:7700/api/posts", newpost);
      navigate("/explore");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(info);
  console.log(files);
  console.log(rating);

  return (
    <div className="createPostContainer">
      <Navbar />
      <div className="cpContainer">

        <div className="formContainer">

          <div className="picsContainer">

            <div className="formInput">
              <h1>Upload Images (Max 6)</h1>
              <label htmlFor="file">
                <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              </label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            <div className="uploadedPictures">
              <div className="upload_pic">
                <img
                  src={
                    files[0]
                      ? URL.createObjectURL(files[0])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
              <div className="upload_pic">
                <img
                  src={
                    files[1]
                      ? URL.createObjectURL(files[1])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
              <div className="upload_pic">
                <img
                  src={
                    files[2]
                      ? URL.createObjectURL(files[2])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
              <div className="upload_pic">
                <img
                  src={
                    files[3]
                      ? URL.createObjectURL(files[3])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
              <div className="upload_pic">
                <img
                  src={
                    files[4]
                      ? URL.createObjectURL(files[4])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
              <div className="upload_pic">
                <img
                  src={
                    files[5]
                      ? URL.createObjectURL(files[5])
                      : "Assets/transparent.png"
                  }
                  alt=""
                  height="80px"
                />
              </div>
            </div>

          </div>

          <div className="inputContainer">

            <div className="columns">
              <div className="column">

                <div className="input">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="title"
                    placeholder="Enter Title"
                  />
                </div>

                <div className="input">
                  <label htmlFor="location">Location</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="location"
                    placeholder="Enter location"
                  />
                </div>

                <div className="input">
                  <div className="formInput">
                    <label>Activity Type</label>
                    <select id="type" className="type" onChange={handleChange}>
                      <option value="select">-Select an activity-</option>
                      {activities.map((item) => (
                        <option value={item.type}>{item.placeholder}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              <div className="column">

                <div className="input">
                  <label htmlFor="price">Price Range</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="priceRange"
                    placeholder="Enter price range"
                  />
                </div>

                <div className="input">
                  <label htmlFor="date">Visited On</label>
                  <input
                    onChange={handleChange}
                    type="date"
                    id="date"
                    placeholder="Enter the date"
                  />
                </div>

                <div className="input">
                  <label htmlFor="rate">Rate your Experience</label>

                  <fieldset class="starability-basic">
                    <input
                      type="radio"
                      id="no-rate"
                      class="input-no-rate"
                      name="rating"
                      value="0"
                      checked
                      aria-label="No rating."
                    />
                    <input
                      type="radio"
                      id="first-rate1"
                      name="rating"
                      value="1"
                      onClick={() => setRating(1)}
                    />
                    <label htmlFor="first-rate1" title="Terrible">
                      1 star
                    </label>
                    <input
                      type="radio"
                      id="first-rate2"
                      name="rating"
                      value="2"
                      onClick={() => setRating(2)}
                    />
                    <label htmlFor="first-rate2" title="Not good">
                      2 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate3"
                      name="rating"
                      value="3"
                      onClick={() => setRating(3)}
                    />
                    <label htmlFor="first-rate3" title="Average">
                      3 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate4"
                      name="rating"
                      value="4"
                      onClick={() => setRating(4)}
                    />
                    <label htmlFor="first-rate4" title="Very good">
                      4 stars
                    </label>
                    <input
                      type="radio"
                      id="first-rate5"
                      name="rating"
                      value="5"
                      onClick={() => setRating(5)}
                    />
                    <label htmlFor="first-rate5" title="Amazing">
                      5 stars
                    </label>
                  </fieldset>
                </div>

              </div>
            </div>
            <div className="input" id="lastInput">
              <label htmlFor="desc">Description</label>
              <input
                onChange={handleChange}
                type="text"
                id="desc"
                placeholder="A brief description"
              />
            </div>

            <button className="button" onClick={handleClick} type="submit">
              Post
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
