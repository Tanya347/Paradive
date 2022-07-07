import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import PostCard from "../../components/PostCard/PostCard"
import { useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom"

import './activity.css'

function Activity() {

    const activities = [
        { type: "wakeboarding", src: "https://images.unsplash.com/photo-1629267304837-d765333b8b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2FrZWJvYXJkaW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "surfing", src: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3VyZmluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=1000&q=60" },
        { type: "canoeing", src: "https://images.unsplash.com/photo-1512688553530-9d6e0894b89e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbm9laW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "jetskiing", src: "https://images.unsplash.com/photo-1558954045-d85cbd0bf19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amV0JTIwc2tpaW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "parasailing", src: "https://images.unsplash.com/photo-1505738313577-5357ff512f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFyYXNhaWxpbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "diving", src: "https://images.unsplash.com/photo-1583364493238-248032147fbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZGl2aW5nfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "rafting", src: "https://images.unsplash.com/photo-1508166466920-f65aa51f727c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFmdGluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=1000&q=60" },
        { type: "bananaboat", src: "https://images.unsplash.com/photo-1521289594125-e8e32a214a2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFuYW5hJTIwYm9hdHxlbnwwfDB8MHx8&auto=format&fit=crop&w=1000&q=60" },
        { type: "hanggliding", src: "https://images.unsplash.com/photo-1551891588-73c0bf66be48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZ2xpZGluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=1000&q=60" },
        { type: "paragliding", src: "https://images.unsplash.com/photo-1471247511763-88a722fc9919?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyYWdsaWRpbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "swimming", src: "https://images.unsplash.com/photo-1470376619031-a6791e534bf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3dpbW1pbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" },
        { type: "fishing", src: "https://images.unsplash.com/photo-1601226041388-8bbabdd6e37e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZpc2hpbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" },
    ];

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data, loading } = useFetch(
        "/posts"
    );

    const keys = ["type"]

    const search = (data) => {
        return data.filter(
            (item) => keys.some(key => item[key].toLowerCase().includes(id))
        )
    }

    return (
        <div className='activityContainer'>
            <Navbar />
            <div className="search">
                <h1>{id}</h1>
            </div>
            <div className="searchedPosts">
                {loading ? (
                    "loading"
                ) : (
                    <>

                        {
                            search(data).map((item, i) => (
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
                                </div >
                            ))
                        }
                    </>
                )}
            </div>


            <Footer />
        </div>
    )
}

export default Activity