import React from "react";
import "./post.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  faCoins,
  faCalendar,
  faPersonSwimming,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";


function Post() {
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { data } = useFetch(`/posts/${id}`);
  const { user } = useContext(AuthContext);
  let isUser
  if (user) {
    isUser = data.userId === user._id;
  }
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
      <div className="search">
        <div className="upperContent">
          <h1>{data.title}</h1>
          <p>{data.desc}</p>
        </div>
      </div>

      <div className="postContainer">

        <div className="leftContainer">

          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <div className="images">
              {data.photos?.map((photo, i) => (
                <SwiperSlide>
                  <div className="postImgWrapper" key={i}>
                    <img
                      src={photo}
                      alt=""
                      className="postImg"
                      width="300px"
                      id={`image${i}`}
                      height="250px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

        </div>

        <div className="rightContainer">
          <div className="postContent">

            <div className="lowerContent">
              <div className="title">
                <span>Activity Type  :  </span>
                {data.type}
              </div>
              <p>
                <FontAwesomeIcon className="icon" icon={faCoins} />
                <span> Price Range  :  </span>
                {data.priceRange}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faCalendar} />
                <span> Visited On  :  </span>
                {data.date}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faPersonSwimming} />
                <span> Posted By  :  </span>
                {data.username}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faMapLocationDot} />
                <span> Location  :  </span>
                {data.location}
              </p>
              <p class="starability-result" data-rating={data.rating}></p>
              {/* <Link to="edit">
                {isUser && <button>Edit</button>}
              </Link> */}
              {user && isUser && <button onClick={handleDelete}>Delete</button>}
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Post;
