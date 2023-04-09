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
          src="https://drive.google.com/uc?export=view&id=1Cswtm2KJ1_-7YIxbbnW0XKu1CB95wq79"
          className="footerElement"
          alt=""
        />
        <p className="footerElement">
          We are a community promotes outdoor activities and allows people
          to explore more such activities through engagement
        </p>
      </div>
      <div className="footerColumn others">
        <h2 className="footerElement">Contact Us</h2>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <p> Delhi </p>
        </div>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faPhone} />
          <p>07102020</p>
        </div>
        <div className="footerElement">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p> paradive@gmail.com</p>
        </div>
      </div>
      <div className="footerColumn others last">
        <h2 className="footerElement">Follow Us</h2>
        <div className="footerElement">
          <img
            className="icon"
            src="https://drive.google.com/uc?export=view&id=1Xc12SJ8PYRuQuEnBfArrdWbGeaq__B4X"
            alt=""
          />
          <img
            className="icon"
            src="https://drive.google.com/uc?export=view&id=158PSgCmKcVuKBIOLqNughFvPpYxesQlo"
            alt=""
          />
          <img
            className="icon"
            src="https://drive.google.com/uc?export=view&id=1UnATwRPHUDCJmm-21kltm8MBpAXl7rnk"
            alt=""
          />
          <img
            className="icon"
            src="https://drive.google.com/uc?export=view&id=10AtAKMb6HCEGlV4wRzPBgXv565r0nEfg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
