import React from 'react'
import { useLocation } from "react-router-dom"
import useFetch from '../../Hooks/useFetch';
import "./userPage.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { Link } from 'react-router-dom'

const UserPage = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data } = useFetch(`/users/${id}`)
    
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
                        {data.username}
                    </p>
                    <p>
                        <span> Bio  :  </span>
                        {data.username}
                    </p>
                </div>
            </div>
            <div className="searchedPosts">
                
                {data.posts.map((item) => (
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
            </div>
            <Footer />
        </div>
    )
}

export default UserPage