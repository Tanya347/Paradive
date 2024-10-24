import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from '../../context/authContext';
import "./comments.css"
import EditComment from '../EditComment/EditComment';

const Comments = ({comments}) => {
    const [open, setOpen] = useState(false);
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useAuth();

    const handleCommentDelete = async (id) => {
        try {
    
          await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${id}`)
    
          window.location.reload();
        } catch (err) {
          console.log(err)
        }
      };

    const handleEdit = async(c) => {
      setCommentId(c._id)
      setComment(c.comment)
      setOpen(true)
    }
  return (
    <div className="">
        <div className="comments">
        {comments?.length > 0 ? (
            <>
                {comments?.map((c, ind) => (
                    <div className="comment-box" key={ind}
                      onMouseOver={() => setIsExpanded(true)} 
                      onMouseLeave={() => setIsExpanded(false)}
                    >
                      <div className="comment-header">
                        <div className="comment-author">
                          <img src={c.author.profilePicture} alt="" />
                          <h4><span>@{c.author.username}</span> says</h4>
                        </div>
                        {user && user._id === c.author._id && <div className="comment-action-buttons">
                          <FontAwesomeIcon onClick={() => handleEdit(c)}className="icon" icon={faEdit} />
                          <FontAwesomeIcon onClick={() => handleCommentDelete(c._id)} className="icon" icon={faTrash} />
                        </div>}
                      </div>
                      <div className="comment-content">
                        <p>
                          {isExpanded || c.comment.length <= 150
                            ? c.comment
                            : `${c.comment.slice(0, 150)}...`
                          }
                        </p>
                      </div>
                    </div>
                ))}
            </>
                ) : (
                    <>
                    <h2>No Comments at the Moment</h2>
                    </>
                )}
    </div>
    {open && <EditComment setOpen={setOpen} commentId={commentId} comment={comment}/>}
    </div>
  )
}

export default Comments