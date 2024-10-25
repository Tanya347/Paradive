import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/authContext';
import { handleChange } from '../../commons';
import './addComment.css'
import { addComment } from '../../apis/usePost';

const AddComment = ({setOpen, postId}) => {
    const {user} = useAuth();
    const [info, setInfo] = useState({});

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await addComment(info, postId); // Use the service function to handle the comment creation
          setOpen(false);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
    };

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
                        onChange={(e) => handleChange(e, setInfo)}
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