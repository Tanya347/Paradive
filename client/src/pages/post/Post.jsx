import React from "react";
import "./post.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  faDollarSign,
  faCalendar,
  faPersonSwimming,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Post() {
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { data, loading } = useFetch(`/posts/${id}`);
  const { user } = useContext(AuthContext);
  const images = data.photos;
  const isUser = data.userId === user._id;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7700/api/posts/${data._id}`);
      navigate('/explore')
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="postPage">
      <Navbar />
      <div className="postContainer">
        <div className="leftContainer">
          <div className="postContent">
            <div className="upperContent">
              <h1>{data.title}</h1>
            </div>
            <p>{data.desc}</p>

            <div className="lowerContent">
              <div className="title">
                <span>Activity: Type</span>
                {data.type}
              </div>
              <p>
                <FontAwesomeIcon className="icon" icon={faDollarSign} />
                <span> Price Range : </span>
                {data.priceRange}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faCalendar} />
                <span> Visited On : </span>
                {data.date}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faPersonSwimming} />
                <span> Posted By : </span>
                {data.username}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                <span> Location : </span>
                {data.location}
              </p>
              {/* <Link to="edit">
                {isUser && <button>Edit</button>}
              </Link> */}
              {isUser && <button onClick={handleDelete}>Delete</button>}
            </div>
          </div>

          {/* <div className="comments">
                        <div className="title"><span>Comment(s): </span>5</div>
                        <div className="comment">
                            <h2 className='CommentAuth'>Natasha Sloan</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius labore facilis aspernatur tempore, reiciendis, iste sunt aliquid, esse harum molestiae accusamus aliquam minima? Tenetur quae ipsa eum incidunt nobis.</p>
                        </div>
                    </div> */}
        </div>
        <div className="rightContainer">
          <div className="map">
            {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.8149368335253!2d77.23020441424978!3d28.665259382404848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683919c3b%3A0xf5fc331b74c2b9e2!2sIndira%20Gandhi%20Delhi%20Technical%20University%20for%20Women!5e0!3m2!1sen!2sin!4v1600941143402!5m2!1sen!2sin"
                            allowfullscreen title='map'></iframe> */}
          </div>

          <div className="images">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  //   onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                  width="300px"
                  height="250px"
                />
              </div>
            ))}
            {/* {loading ? (
                            "loading"
                        ) : (
                            <>
                                {images.map((image, i) => (
                                    <img key={i} src={image} width="300px" height="250px" alt="" />
                                ))}
                            </>)} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Post;
