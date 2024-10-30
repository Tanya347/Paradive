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
import { handleChange } from '../../commons';
import { editPost } from '../../apis/useEdit';
import { ClipLoader } from 'react-spinners';

const EditPost = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const spinner = document.getElementById("spinner");
    const [postLoader, setPostLoader] = useState(false);
    const { data, loading} = useFetch(`/posts/${id}`);
    const [info, setInfo] = useState({});
    const [rating, setRating] = useState(0);
    const [selectedPhotos, setSelectedPhotos] = useState(new Set()); // Track selected photos for deletion
    const [newFiles, setNewFiles] = useState([]); // Track new files to upload
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && inputValue.trim() && tags.length < 5) {
          addTag(inputValue.trim());
          e.preventDefault(); 
        }
      };
    
      const addTag = (tag) => {
        if (!tags.includes(tag)) {
          setTags([...tags, tag]);
        }
        setInputValue('');
      };
    
      const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
      };

    useEffect (() => {
        setInfo(data)
        if(data.tags)
            setTags(data.tags)
        if(data.rating)
            setRating(data.rating)
        
    }, [data, data.rating, data.tags])

    useEffect (() => {
        if(!loading)
            spinner.style.display = "none";
    }, [loading, spinner.style])

    const handleClick = async(e) => {
        e.preventDefault();
        setPostLoader(true);
        try {
            await editPost(id, info, selectedPhotos, newFiles, rating, tags); // Call the service function
            navigate(`/${id}`); // Navigate to the updated post
        } catch (err) {
            console.log(err);
        } finally {
            setPostLoader(false);
        }
    }

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <>
            {
                !loading && <>
                    <div className="editPostContainer">
                        <Navbar />
                        <div className="cpContainer">
                            <div className="formContainer">
                                
                                <div className="picsContainer">
                                    <h2>Select Images you want to delete</h2>
                                    {
                                        loading ? (
                                            <>
                                                <ClipLoader color="white" size={40} />
                                            </>
                                        ) : (
                                            <>
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
                                            </>
                                        )
                                    }
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
                                                <label>Activities</label>
                                                <div style={{ position: "relative", width: "300px"}}>
                                                    <div className="selected-tags">
                                                    {tags?.map((tag, ind) => (
                                                        <span key={ind} className="tag">
                                                        {tag} <button className="cross-button" onClick={() =>removeTag(tag)}>x</button>
                                                        </span>
                                                    ))}
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        id="tags"
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="Type tag and press Enter"
                                                    />
                                                    {tags.length >= 5 && <p>Maximum of 5 tags allowed.</p>}
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
                                    
                                    { postLoader && <div className="post-loader">
                                        <ClipLoader color="white" size={30} />
                                        updating post...
                                    </div>}

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
                </>
            }
        </>
    )
}

export default EditPost