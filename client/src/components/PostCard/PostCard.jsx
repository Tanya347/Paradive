import React from "react";
import useFetch from "../../Hooks/useFetch";
import "./postcard.css";
import { Link } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

function ActivityCard() {
  const { data, loading } = useFetch("/posts");

  const posts = data.slice(0, 3);

  useEffect(() => {
    Aos.init({duration: 1000});
  },[])

  return (
    <div className="container">

    <h2>Featured Posts</h2>
      <div className="postcards">
      {loading ? (
        <>
        <img id="loading" src="https://drive.google.com/uc?export=view&id=1F5a3bey3bRFFVWkX5BM-V_jgi8ludD0A" alt="loading"/>
        </>        
      ) : (
        <>
          {posts.map((item) => (
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
      )}
      </div>
    </div>
  );
}

export default ActivityCard;
