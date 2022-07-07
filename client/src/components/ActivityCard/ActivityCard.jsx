import React from "react";
import { Link } from "react-router-dom";
import "./activityCard.css";

function Card(props) {
  return (
    <div className="activityCardContainer">

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
