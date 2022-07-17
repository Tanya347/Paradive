import React from "react";
import "./searchPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../Hooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/posts");

  const keys = ["type", "title", "location"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div className="searchContainer">
      <Navbar />
      <div className="search">
        <div className="searchBar">
          <h2>Explore</h2>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search Activities, places or posts"
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      <div className="searchedPosts">
        {loading ? (
          // "loading"
          <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        ) : (
          <>
            {search(data).map((item, i) => (
              <div className="card" key={item._id}>
                <div class="content">
                  <img id="post-image" src={item.photos[0]} alt="" />
                  <h4>{item.title}</h4>
                  <h6>
                    <span>Location : </span> {item.location}
                  </h6>
                  <h6>
                    <span>Activity : </span> {item.type}
                  </h6>
                  <p>{item.desc}</p>
                  <Link to={`/${item._id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
