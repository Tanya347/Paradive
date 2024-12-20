import React from 'react'
import useFetch from '../../apis/useFetch';
import "./userPage.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import Modal from '../../components/EditProfile/EditProfile';
import { useAuth } from '../../context/authContext';
import { ClipLoader } from 'react-spinners';
import Deactivate from '../../components/Deactivate/Deactivate';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const UserPage = () => {
    const [open, setOpen] = useState(false);
    const [deactOpen, setDeactOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const {user} = useAuth();
    const {data, loading} = useFetch('/posts');
    const [postData, setPostData] = useState([]);

    // populate not working in deployed version so have to do this instead
    useEffect(() => {
        const filteredArray = data.filter(item => item.author === user._id)
        setPostData(filteredArray)
    }, [data, user._id])

    useEffect(() => {
        Aos.init({duration: 1000});
      },[])

    return (
        <>
            {
                !loading && <div className='userPageContainer'>

                    <Navbar />
                    <div className="infoContainer">
                        <div className="column">
                        <div className="col" id='profile'>
                            <div className="pic">
                                <img src={user.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
        
                            </div>
                        </div>
                        <div className="col" id='bio'>
                            <h3><span>Username</span></h3>
                            <p>
                                {user.username}
                            </p>
                            <h3><span> Email</span></h3>
                            <p>
                                {user.email}
                            </p>
                            <h3><span> Bio</span></h3>
                            <p>
                                {user.desc}
                            </p>
                        </div>
                        </div>
                        <div className="action-buttons-container">
                            <div className="edit-button">
                                <button onClick={() => setOpen(true)}>Edit Profile</button>
                            </div>
                            <div className="reset-password-button">
                                <button onClick={() => setResetOpen(true)}>Reset Password</button>
                            </div>
                            <div className="deactivate-button">
                                <button onClick={() => setDeactOpen(true)}>Deactivate Account</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="searchedPosts">
                    {
                        loading ? (
                            <>
                                <ClipLoader color="white" size={40} />
                            </>
                        ) : (
                            <>
                                {postData.length > 0? 
                                    <>
                                        {postData?.map((item) => (
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
                                                {item.desc && <p>{item.desc.slice(0,70)}...</p>}
                                                <Link to={`/${item._id}`}>
                                                    <button>Read More</button>
                                                </Link>
                                            </div>
                                        </div>
                                        ))}
                                    </>
                                :
                                    <>
                                        <div className="p" style={{"color": "white", "fontFamily": "'Kaushan Script', cursive", "margin": "20px 0"}}>No Posts</div>
                                    </>
                                }
                            </>
                        )
                    }
                    </div>
                    <Footer />
                    {open && <Modal setOpen={setOpen} />}
                    {deactOpen && <Deactivate setOpen={setDeactOpen} id = {user._id} />}
                    {resetOpen && <ResetPassword setResetOpen={setResetOpen} />}
                </div>
            }
        </>
    )
}

export default UserPage