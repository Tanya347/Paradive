import React, { useContext, useState } from "react";
import "./createPost.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import activities from "../Activity/activities"

function CreatePost() {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files)?.map(async (file) => {
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

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, newpost)

      navigate("/explore");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="createPostContainer">
      <Navbar />
      <div className="cpContainer">
        <div className="formContainer">

          <div className="picsContainer">

            <div className="formInput">
              <h2>Upload Images (Max 6)</h2>
              <label htmlFor="file">
                <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              </label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                style={{ display: "none" }}
              />
            </div>
            <div className="uploadedPictures">
              {files?.map((file, index) => (
                  <div className="upload_pic" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      height="80px"
                    />
                  </div>
                ))}
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
                      {activities?.map((item) => (
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
                  <label htmlFor="star-icon">Rating</label>
                  <div className="star-rating-slider">
                    
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={star <= rating ? solidStar : regularStar}
                        className={"star-icon"}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
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
