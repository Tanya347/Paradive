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
import Modal from '../../components/modal/Modal';

const UserPage = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data } = useFetch(`/users/${id}`)
    const [postData, setPostData] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setPostData(data.posts)
    },[data.posts])

    useEffect(() => {
        Aos.init({duration: 1000});
      },[])

    return (
        <div className='userPageContainer'>

            <Navbar />
            <div className="infoContainer">
                <div className="column">
                <div className="col" id='profile'>
                    <div className="pic">
                        <img src={data.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />

                    </div>
                </div>
                <div className="col" id='bio'>
                    <h3><span>Username</span></h3>
                    <p>
                        {data.username}
                    </p>
                    <h3><span> Email</span></h3>
                    <p>
                        {data.email}
                    </p>
                    <h3><span> Bio</span></h3>
                    <p>
                        {data.desc}
                    </p>
                </div>
                </div>
                <div className="edit-button">
                    <button onClick={() => setOpen(true)}>Edit Profile</button>
                </div>
            </div>
            
            <div className="searchedPosts">
                {postData? 
                    <>
                        {postData.map((item) => (
                        <div className="card" key={item._id} data-aos="fade-up">
                            <div class="content">
                                {item.photos && <img id="post-image" src={item.photos[0]} alt="no content" />}
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
                        ))}
                    </>
                :
                    <>
                        <div className="p" style={{color: "white", "fontFamily": "'Kaushan Script', cursive"}}>No Posts</div>
                    </>
                }
            </div>
            <Footer />
            {open && <Modal setOpen={setOpen} />}
        </div>
    )
}

export default UserPage