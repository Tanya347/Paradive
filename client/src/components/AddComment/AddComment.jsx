import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../context/authContext';
import axios from "axios";
import './addComment.css'

const AddComment = ({setOpen, postId}) => {
    const {user} = useContext(AuthContext);
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async(e) => {
        e.preventDefault();

        try {
            const newComment = {
                ...info,
                parentPost: postId,
                author: user._id
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/comments`, newComment)
            setOpen(false);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='commentModal'>
        <div className="commentContainer">
            <div className="titleContainer">
                <div className="userContainer">
                    <img src={user.profilePicture ? user.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="user" className="user picture"/>
                    <span className="username">@{user.username}</span>
                </div>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="mCommentClose"
                    onClick={() => setOpen(false)}
                />
            </div>
            <div className="commentInputContainer">
                <div className="commentInput">
                    <input 
                        type="text" 
                        name="comment" 
                        id="comment" 
                        placeholder='Write a comment...'
                        onChange={handleChange}
                    />
                </div>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className='addCommentButton'
                    onClick={handleClick}
                />
            </div>
            

        </div>
    </div>
  )
}

export default AddComment