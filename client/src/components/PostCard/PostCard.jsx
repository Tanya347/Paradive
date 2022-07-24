import React from "react";
import useFetch from "../../Hooks/useFetch";
import "./postcard.css";
import { Link } from "react-router-dom";

function ActivityCard() {
  const { data, loading } = useFetch("/posts");

  const posts = data.slice(0, 3);

  return (
    <div className="container">
      {loading ? (
        "loading"
      ) : (
        <>
          {posts.map((item, i) => (
            <div className="card" key={item._id}>
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
          {/* <div className="card" key={data[0]._id}>
            <div class="content">
              <img id="post-image" src={data[0].img[0]} alt="" />
              <h4>{data[0].title}</h4>
              <h6>
                <span>Posted By : </span> {data[0].username}
              </h6>
              <h6>
                <span>Date : </span> {data[0].date}
              </h6>
              <p>{data[0].desc}</p>
              <button>Read More</button>
            </div>
          </div >

          <div className="card" key={data[1]._id}>
            <div class="content">
              <img id="post-image" src={data[1].img[0]} alt="" />
              <h4>{data[1].title}</h4>
              <h6>
                <span>Posted By : </span> {data[1].username}
              </h6>
              <h6>
                <span>Date : </span> {data[1].date}
              </h6>
              <p>{data[1].desc}</p>
              <button>Read More</button>
            </div>
          </div >

          <div className="card">
            <div class="content">
              <img id="post-image" src={data[2].img[0]} alt="" />
              <h4>{data[2].title}</h4>
              <h6>
                <span>Posted By : </span> {data[2].username}
              </h6>
              <h6>
                <span>Date : </span> {data[2].date}
              </h6>
              <p>{data[2].desc}</p>
              <button>Read More</button>
            </div>
          </div > */}
        </>
      )}
    </div>
  );
}

export default ActivityCard;
