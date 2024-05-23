import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import "./postcard.css";
import { Link } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

function ActivityCard() {
  const { data} = useFetch("/posts");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data.slice(0, 3))
  }, [data])

  useEffect(() => {
    Aos.init({duration: 1000});
  },[])

  return (
    <div className="container">

    <h2>Featured Posts</h2>
      <div className="postcards">
      {posts ? (
        <>
          {posts && posts?.map((item) => (
            <div className="card" key={item._id} data-aos="fade-up">
              <div class="content">
                <img id="post-image" src={item.photos[0]} alt="" />
                <h4>{item.title}</h4>
                <h6>
                  <span>Posted By : </span> {item.username}
                </h6>
                <h6>
                  <span>Date : </span> {item.date}
                </h6>
                <p>{item.desc.slice(0, 60)}...</p>
                <Link to={`/${item._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </> 
      ) : (
        <>
          <div className="p" style={{color: "white", "fontFamily": "'Kaushan Script', cursive"}}>Loading...</div>
        </>
      )}
      </div>
    </div>
  );
}

export default ActivityCard;
