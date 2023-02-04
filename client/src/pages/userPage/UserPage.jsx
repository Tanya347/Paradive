import React from 'react'
import { useLocation } from "react-router-dom"
import useFetch from '../../Hooks/useFetch';
import "./userPage.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const UserPage = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data } = useFetch(`/users/${id}`)
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        setPostData(data.posts)
    },[data])

    useEffect(() => {
        Aos.init({duration: 1000});
      },[])

    return (
        <div className='userPageContainer'>

            <Navbar />
            <div className="infoContainer">
                <div className="col">
                    <div className="pic">
                        <img src={data.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />

                    </div>
                </div>
                <div className="col">
                    <p>
                        <span> Username  :  </span>
                        {data.username}
                    </p>
                    <p>
                        <span> Email  :  </span>
                        {data.email}
                    </p>
                    <p>
                        <span> Bio  :  </span>
                        {data.desc}
                    </p>
                </div>
            </div>
            <div className="searchedPosts">
                
                {postData? postData.map((item) => (
                    <div className="card" key={item._id} data-aos="fade-up">
                        <div class="content">
                            <img id="post-image" src={item.photos[0]} alt="" />
                            <h4>{item.title}</h4>
                            <h6>
                                <span>Location : </span> {item.location}
                            </h6>
                            <h6>
                                <span>Activity : </span> {item.type}
                            </h6>
                            <p>{item.desc.slice(0,70)}...</p>
                            <Link to={`/${item._id}`}>
                                <button>Read More</button>
                            </Link>
                        </div>
                    </div>
                )):"no content"}
            </div>
            <Footer />
        </div>
    )
}

export default UserPage