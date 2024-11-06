import React, { useEffect } from "react";
import "./searchPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { faMagnifyingGlass, faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../apis/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import Aos from 'aos'
import { ClipLoader } from 'react-spinners'
import 'aos/dist/aos.css'

function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, loading } = useFetch("/posts");
  const [showScrollButton, setShowScrollButton] = useState(false);

  const keys = ["title", "location"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query)) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  };
  
  useEffect(() => {
    Aos.init({duration: 1000});

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
          <>
            <ClipLoader color="white" size={40} />
          </>
        ) : (
          <>
            {search(data)?.map((item, i) => (
              <div className="card" key={item._id} data-aos="fade-up">
                <div class="content">
                  <img id="post-image" src={item.photos[0]} alt="no content" />
                  <h4>{item.title}</h4>
                  <h6>
                    <span>Location : </span> {item.location}
                  </h6>
                  <h6>
                    <span>Activity : </span> {item.tags.map((tag, ind) => (
                      <div className="tag-container">{tag}</div>
                    ))}
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
      <Footer />
      {showScrollButton && data.length > 4 && <div className="scroll-to-top">
        <FontAwesomeIcon onClick={scrollToTop} className="icon" icon={faArrowAltCircleUp} />
      </div>}
    </div>
  );
}

export default SearchPage;
