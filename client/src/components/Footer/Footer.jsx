import React from "react";
import "./footer.css";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerColumn">
        <img
          src={process.env.PUBLIC_URL + "/Assets/footerbrand.png"}
          className="footerElement"
          alt=""
        />
        <p className="footerElement">
          We are a community promotes outdoor activities and allows people
          explore more such activities through community engagement
        </p>
      </div>
      <div className="footerColumn others">
        <h2 className="footerElement">Contact Us</h2>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <p> xyz block, Golden Street, Ashok Nagar, Delhi, India 110077</p>
        </div>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faPhone} />
          <p> 12345678910</p>
        </div>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p> abc@gmail.com</p>
        </div>
      </div>
      <div className="footerColumn others last">
        <h2 className="footerElement">Follow Us</h2>
        <div className="footerElement">
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "Assets/4.png"}
            alt=""
          />
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "Assets/5.png"}
            alt=""
          />
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "Assets/6.png"}
            alt=""
          />
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "Assets/7.png"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
