import React from 'react'
import './allActivity.css'
import activities from '../Activity/activities'
import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

function AllActivity() {
    const [query, setQuery] = useState("");

    const keys = ["type"]

    const search = (activities) => {
        return activities.filter(
            (item) => keys.some(key => item[key].toLowerCase().includes(query))
        )
    }

    return (
        <div className="allActivityContainer">
            <Navbar />
            <div className="search">

                <div className="searchBar">
                    <h2>Explore</h2>
                    <div className="searchInput">
                        <input type="text" placeholder="Search Activities, places or posts"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
                    </div>
                </div>
            </div>

            <div className="searchedPosts">
                {
                    search(activities).map((item, i) => (
                        <div className="activityCardContainer">

                            <div className="image-container">
                                <img src={item.src} alt="" />
                            </div>
                            <Link to={`/activity/${item.type}`}>
                                <div className="card-title">
                                    <h3>{item.placeholder}</h3>
                                </div>
                            </Link>
                        </div>
                    ))
                }

            </div>
            <Footer />
        </div >
    )
}

export default AllActivity