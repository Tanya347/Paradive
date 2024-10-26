import React, { useState } from "react";
import "./createPost.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import activities from "../Activity/activities"
import { createPost } from "../../apis/usePost";
import { handleChange } from '../../commons';

function CreatePost() {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...info,
        userId: user._id,
        username: user.username,
        rating: rating,
      };

      const newPost = await createPost(postData, files);

      const postId = newPost._id;
      navigate(`/${postId}`);
    } catch (err) {
      console.error(err);
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
                    onChange={(e) => handleChange(e, setInfo)}
                    type="text"
                    id="title"
                    placeholder="Enter Title"
                  />
                </div>

                <div className="input">
                  <label htmlFor="location">Location</label>
                  <input
                    onChange={(e) => handleChange(e, setInfo)}
                    type="text"
                    id="location"
                    placeholder="Enter location"
                  />
                </div>

                <div className="input">
                  <div className="formInput">
                    <label>Activity Type</label>
                    <select id="type" className="type" onChange={(e) => handleChange(e, setInfo)}>
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
                    onChange={(e) => handleChange(e, setInfo)}
                    type="text"
                    id="priceRange"
                    placeholder="Enter price range"
                  />
                </div>

                <div className="input">
                  <label htmlFor="date">Visited On</label>
                  <input
                    onChange={(e) => handleChange(e, setInfo)}
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
                    onChange={(e) => handleChange(e, setInfo)}
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
