import React, { useEffect } from "react";
import "./post.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  faCoins,
  faCalendar,
  faPersonSwimming,
  faMapLocationDot,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import useFetch from "../../apis/useFetch";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import AddComment from "../../components/AddComment/AddComment";
import Comments from "../../components/comments/Comments";
import { toast } from "react-toastify";

function Post() {
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { data, loading } = useFetch(`/posts/${id}`);
  const { user } = useAuth();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const spinner = document.getElementById("spinner");
  
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10
  });

  useEffect(() => {
    if(!loading)
      spinner.style.display = "none";
  }, [loading, spinner.style])

  useEffect(() => {

    const getPlaces = async () => {
      
      if(data.location) {
        

        try {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data?.location}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
          const placesData = await response.json();

          if (placesData.features.length > 0) {
            const firstPlace = placesData.features[0];
            const { center } = firstPlace;
            setViewState((prevState) => ({
              ...prevState,
              latitude: center[1],
              longitude: center[0],
            }));
          }
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      }
    };
    getPlaces();
  }, [data?.location]);

  const navigate = useNavigate();

  let isUser
  if (user) {
    isUser = data.author === user._id;
  }

  const handleDelete = async () => {
    try {

      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${data._id}`, {withCredentials: true})
      if(res.data.status === 'success') {
        toast.success("Post Deleted Successfully!");
      }
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
    <>
      {
        !loading && <div className="postPage">
        <Navbar />
  
        <div className="post-container">
        <div className="right-post-container">
            <div className="map-container">
              {data.location && viewState.latitude && viewState.longitude && <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{width: 600, height: 300}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              >
                <Marker className="marker" longitude={viewState.longitude} latitude={viewState.latitude} color="red" />
              </Map>}
            </div>
              {data?.photos ? (<div className="images">
  
  
                <img src={data?.photos[slideNumber]} height="300px" alt="" />
  
                {data?.photos?.length > 1 ? <div className="arrows">
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
          <div className="left-post-container">
            <div className="description-container">
              <h1>{data.title}</h1>
              <p>{data.desc}</p>
            </div>
            <div className="information-container">
                <div className="info-header">
                  <div className="title">
                    <span>Activity Type  :  </span>
                    {data?.type}
                  </div>
                  <p class="starability-result" data-rating={data.rating}></p>
                </div>
                <p>
                  <FontAwesomeIcon className="icon" icon={faCoins} />
                  <span> Price Range  :  </span>
                  {data?.priceRange}
                </p>
                <p>
                  <FontAwesomeIcon className="icon" icon={faCalendar} />
                  <span> Visited On  :  </span>
                  {data?.date}
                </p>
                <p>
                  <FontAwesomeIcon className="icon" icon={faPersonSwimming} />
                  <span> Posted By  :  </span>
                  {data?.username}
                </p>
                <p>
                  <FontAwesomeIcon className="icon" icon={faMapLocationDot} />
                  <span> Location  :  </span>
                  {data?.location}
                </p>
  
                {user && isUser && <div className="post-button-container">
                  <button className="post_button" style={{"marginRight":"5px"}} onClick={handleDelete}>Delete</button>
                  <button className="post_button" onClick={() => navigate(`/edit/${data._id}`)}>Edit</button>
                </div>}
  
            </div>
            <div className="comments-container">
              <div className="comments-header">
                <div className="title">
                  <span>Comments  :  </span>
                  {data?.comments?.length}
                </div>
                <div className="post_button" onClick={() => setOpen(true)}>
                  New Comment
                </div>
              </div>
                <Comments comments={data?.comments} />
            </div>
          </div>
        </div>
   
        <Footer />
        {open && <AddComment setOpen={setOpen} postId={id}/>}
      </div>
      }
    </>
  );
}

export default Post;
