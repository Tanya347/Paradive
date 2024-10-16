import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './editPost.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../apis/useFetch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Footer from '../../components/Footer/Footer';
import activities from "../Activity/activities"
import axios from 'axios';
import { handleChange } from '../../commons';

const EditPost = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const navigate = useNavigate();

    const {data} = useFetch(`/posts/${id}`);
    const [info, setInfo] = useState({});
    const [rating, setRating] = useState(0);
    const [selectedPhotos, setSelectedPhotos] = useState(new Set()); // Track selected photos for deletion
    const [newFiles, setNewFiles] = useState([]); // Track new files to upload

    useEffect (() => {
        setInfo(data)
        if(data.rating)
            setRating(data.rating)
    }, [data, data.rating])

    const handleClick = async(e) => {
        e.preventDefault();

        // Step 1: Handle photo deletions
        const photosToDelete = Array.from(selectedPhotos);
        const updatedPhotos = info.photos.filter((photo) => !photosToDelete.includes(photo));
        var uploadedPhotos = [];
        // Step 2: Handle new photo uploads
        if(newFiles.length > 0) {
            uploadedPhotos = await Promise.all(
                newFiles.map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
                        data
                    );
                    return uploadRes.data.url; // Assuming response contains the URL
                })
            );
        }

        const finalPhotos = [...updatedPhotos, ...uploadedPhotos];

        const editpost = {
            ...info,
            photos: finalPhotos,
            rating: rating
        }

        try {
            process.env.REACT_APP_MODE === "development" ? 
                (await axios.put(`/posts/${data._id}`, editpost, {withcredentials: false})) 
                : (
                    await axios.put(`${process.env.REACT_APP_API_URL}/posts/${data._id}`, 
                    editpost, 
                    {withcredentials: false})
                )
            navigate(`/${id}`);
        } catch(err) {
            console.log(err);
        }
    }

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <div className="editPostContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    
                    <div className="picsContainer">
                        <h2>Select Images you want to delete</h2>
                        {info?.photos && <div className="uploadedPictures">
                            {
                                info?.photos?.map((ph, ind) => (
                                    <div className="upload_pic" key={ind}>
                                        <input 
                                            type="checkbox"
                                            id={`photo-${ind}`}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    selectedPhotos.add(ph);
                                                } else {
                                                    selectedPhotos.delete(ph);
                                                }
                                                setSelectedPhotos(new Set(selectedPhotos)); // Update the state
                                            }}
                                        />
                                        <img src={ph} alt="" height="80px"/>
                                    </div>
                                ))
                            }
                        </div>}
                    </div>
                    <div className="picsContainer">
                        <div className="formInput">
                            <h2>Upload New Images (Max 6)</h2>
                            <label htmlFor="file">
                                <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                            </label>
                            <input
                                type="file"
                                id="file"
                                multiple
                                onChange={(e) => setNewFiles(Array.from(e.target.files))}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="uploadedPictures">
                        {newFiles?.map((file, index) => (
                            <div className="upload_pic" key={index}>
                                <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                height="80px"
                                />
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="inputContainer">
                        <div className="columns">
                            <div className="column">

                                <div className="input">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        onChange={(e) => handleChange(e, setInfo)}
                                        type="text"
                                        id="title"
                                        value={info.title}
                                        placeholder="Enter Title"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        onChange={(e) => handleChange(e, setInfo)}
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
                                        onChange={(e) => handleChange(e, setInfo)}
                                        >
                                        <option value="select">-Select an activity-</option>
                                        {activities?.map((item) => (
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
                                        onChange={(e) => handleChange(e, setInfo)}
                                        type="text"
                                        id="priceRange"
                                        value={info.priceRange}
                                        placeholder="Enter price range"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="date">Visited On</label>
                                    <input
                                        onChange={(e) => handleChange(e, setInfo)}
                                        type="date"
                                        value={info.date}
                                        id="date"
                                        placeholder="Enter the date"
                                    />
                                </div>


                            <div className="input">
                            <label htmlFor="rate">Re-rate your Experience</label>
                                <div className="star-rating-slider">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                    <FontAwesomeIcon
                                        key={star}
                                        icon={star <= rating ? solidStar : regularStar}
                                        className={"star-icon"}
                                        onClick={() => handleStarClick(star)}
                                    />
                                    ))}
                                </div>
                                
                            </div>
                            </div>
                        </div>

                        <div className="input" id="lastInput">
                            <label htmlFor="desc">Description</label>
                            <input
                                onChange={(e) => handleChange(e, setInfo)}
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