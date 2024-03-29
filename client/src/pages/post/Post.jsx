import React from "react";
import "./post.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  faCoins,
  faCalendar,
  faPersonSwimming,
  faMapLocationDot,
  faCircleArrowLeft,
  faCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import useFetch from "../../Hooks/useFetch";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";


function Post() {
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { data } = useFetch(`/posts/${id}`);
  const { user } = useContext(AuthContext);
  const [slideNumber, setSlideNumber] = useState(0);

  let isUser
  if (user) {
    isUser = data.userId === user._id;
  }

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {

      process.env.REACT_APP_MODE === "development" ? (await axios.delete(`http://localhost:7700/api/posts/${data._id}`)) : (await axios.delete(`https://paradive.onrender.com/api/posts/${data._id}`))

      navigate('/explore')
    } catch (err) {
      console.log(err)
    }
  };



  const handleMove = (direction) => {
    let newSlideNumber;
    let size = data.photos.length
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? size - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === size - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  }

  return (
    <div className="postPage">
      <Navbar />
      <div className="postPageBG">
        <div className="upperContent">
          <h1>{data.title}</h1>
          <p>{data.desc}</p>
        </div>
      </div>

      <div className="postContainer">

        <div className="leftContainer">


          {data.photos ? (<div className="images">


            <img src={data.photos[slideNumber]} height="300px" alt="" />

            {data.photos.length > 1 ? <div className="arrows">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div> : ""}
          </div>) : ("no Images")}

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
              {user && isUser && <button className="del_button" style={{"marginRight":"5px"}} onClick={handleDelete}>Delete</button>}
              {user && isUser && <button className="del_button" onClick={() => navigate(`/edit/${data._id}`)}>Edit</button>}

            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Post;
