import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from '../../context/authContext';
import "./comments.css"
import EditComment from '../EditComment/EditComment';
import { toast } from 'react-toastify';
import AddComment from '../AddComment/AddComment';

const Comments = ({postId}) => {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useAuth();
    const [reload, setReload] = useState(false);

    useEffect(() => {
      // Fetch comments data
      const fetchComments = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/comments/${postId}`, {withCredentials: true}
          );
          setComments(res.data.comments);
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      };
  
      fetchComments();
    }, [postId, reload]); // Re-fetch when postId or reload changes

    const handleCommentDelete = async (id) => {
        try {
    
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${id}`, {withCredentials: true})
          if(res.data.status === 'success') {
            toast.success("Comment Deleted successfully!");
            setReload((prev) => !prev);
          }
          // window.location.reload();
        } catch (err) {
          const errorMessage = err.response?.data?.message || "Failed to delete comment. Please try again.";
          toast.error(errorMessage);
          console.error(err);
          throw err;
        }
      };

    const handleEdit = async(c) => {
      setCommentId(c._id)
      setComment(c.comment)
      setOpen(true)
    }
  return (
    <div className="comments-container">
        <div className="comments-header">
          <div className="title">
            <span>Comments  :  </span>
            {comments?.length}
          </div>
          <div className="post_button" onClick={() => setOpenAdd(true)}>
            New Comment
          </div>
        </div>
        <div className="comments">
        {comments?.length > 0 ? (
            <>
                {comments?.map((c, ind) => (
                    <div className="comment-box" key={ind}
                      onMouseOver={() => setIsExpanded(true)} 
                      onMouseLeave={() => setIsExpanded(false)}
                      onClick={() => setIsExpanded((prev) => !prev)}
                    >
                      <div className="comment-header">
                        <div className="comment-author">
                          {<img src={c?.author?.profilePicture ? c?.author?.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />}
                          <h4><span>@{c?.author?.username}</span> says</h4>
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
    {open && <EditComment 
      setOpen={setOpen}
      commentId={commentId}
      comment={comment}
      onCommentUpdated={() => setReload((prev) => !prev)}
    />}
    {openAdd && <AddComment
      setOpen={setOpenAdd} 
      postId={postId}
      onCommentUpdated={() => setReload((prev) => !prev)}
    />}
    </div>
  )
}

export default Comments