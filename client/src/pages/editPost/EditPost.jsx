import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './editPost.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch';
import Footer from '../../components/Footer/Footer';
import activities from "../Activity/activities"
import axios from 'axios';


const EditPost = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const navigate = useNavigate();

    const {data} = useFetch(`/posts/${id}`);
    const [info, setInfo] = useState({});

    useEffect (() => {
        setInfo(data)
    }, [data])
    
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async(e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:7700/api/posts/${id}`, info, {withCredentials: false});
            navigate(`/${id}`);
        } catch(err) {
            console.log(err);
        }
    }



    return (
        <div className="editPostContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    
                    <div className="picsContainer">
                        {info.photos && <div className="uploadedPictures">
                            {info.photos[0] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                            {info.photos[1] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                            {info.photos[2] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                            {info.photos[3] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                            {info.photos[4] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                            {info.photos[5] && <div className="upload_pic">
                                <img src={info.photos[0]} alt="" height="80px"/>
                            </div>}
                        </div>}
                    </div>

                    <div className="inputContainer">
                        <div className="columns">
                            <div className="column">

                                <div className="input">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="title"
                                        value={info.title}
                                        placeholder="Enter Title"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="location"
                                        value={info.location}
                                        placeholder="Enter location"
                                    />
                                </div>

                                <div className="input">
                                    <div className="formInput">
                                        <label>Activity Type</label>
                                        <select 
                                            id="type" 
                                            className="type" 
                                            value={info.type}
                                        onChange={handleChange}
                                        >
                                        <option value="select">-Select an activity-</option>
                                        {activities.map((item) => (
                                            <option value={item.type}>{item.placeholder}</option>
                                        ))}
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div className="column">
                                <div className="input">
                                    <label htmlFor="price">Price Range</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="priceRange"
                                        value={info.priceRange}
                                        placeholder="Enter price range"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="date">Visited On</label>
                                    <input
                                        onChange={handleChange}
                                        type="date"
                                        value={info.date}
                                        id="date"
                                        placeholder="Enter the date"
                                    />
                                </div>
                            </div>


                        </div>

                        <div className="input" id="lastInput">
                            <label htmlFor="desc">Description</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="desc"
                                value={info.desc}
                                placeholder="A brief description"
                            />
                        </div>

                        <button 
                            className="button" 
                            onClick={handleClick} 
                            type="submit"
                        >
                            Edit
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EditPost