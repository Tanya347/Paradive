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
    const [rating, setRating] = useState(0);

    useEffect (() => {
        setInfo(data)
    }, [data])
    
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async(e) => {
        e.preventDefault();

        const editpost = {
            ...info,
            rating: rating
        }

        try {
            process.env.REACT_APP_MODE === "development" ? 
                (await axios.put(`/posts/${data._id}`, editpost, {withcredentials: false})) 
                : (
                    await axios.put(`https://paradive.onrender.com/api/posts/${data._id}`, 
                    editpost, 
                    {withcredentials: false})
                )
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
                        <h2>Images Cannot be Changed</h2>
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


                            <div className="input">
                            <label htmlFor="rate">Re-rate your Experience</label>

                                <fieldset class="starability-basic">
                                    <input
                                        type="radio"
                                        id="no-rate"
                                        class="input-no-rate"
                                        name="rating"
                                        value={info.rating}
                                        checked
                                        aria-label="No rating."
                                        />
                                    <input
                                        type="radio"
                                        id="first-rate1"
                                        name="rating"
                                        value="1"
                                        onClick={() => setRating(1)}
                                        />
                                    <label htmlFor="first-rate1" title="Terrible">
                                        1 star
                                    </label>
                                    <input
                                        type="radio"
                                        id="first-rate2"
                                        name="rating"
                                        value="2"
                                        onClick={() => setRating(2)}
                                        />
                                    <label htmlFor="first-rate2" title="Not good">
                                        2 stars
                                    </label>
                                    <input
                                        type="radio"
                                        id="first-rate3"
                                        name="rating"
                                        value="3"
                                        onClick={() => setRating(3)}
                                        />
                                    <label htmlFor="first-rate3" title="Average">
                                        3 stars
                                    </label>
                                        <input
                                        type="radio"
                                        id="first-rate4"
                                        name="rating"
                                        value="4"
                                        onClick={() => setRating(4)}
                                        />
                                    <label htmlFor="first-rate4" title="Very good">
                                        4 stars
                                    </label>
                                    <input
                                        type="radio"
                                        id="first-rate5"
                                        name="rating"
                                        value="5"
                                        onClick={() => setRating(5)}
                                        />
                                    <label htmlFor="first-rate5" title="Amazing">
                                        5 stars
                                    </label>
                                </fieldset>
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