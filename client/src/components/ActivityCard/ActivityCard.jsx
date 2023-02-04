import React from "react";
import { Link } from "react-router-dom";
import "./activityCard.css";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

function Card(props) {

  useEffect(() => {
    Aos.init({duration: 1000});
  },[])

  return (
    <div className="activityCardContainer" data-aos="flip-left">

      <div className="image-container">
        <img src={props.src} alt="" />
      </div>
      <Link to={`/activity/${props.link}`}>
        <div className="card-title">
          <h3>{props.name}</h3>
        </div>
      </Link>
    </div>
  );
}

export default Card;
