import React, { useEffect } from 'react'
import "./editProfile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { handleUpdateUser } from '../../apis/useEdit';
import { useAuth } from '../../context/authContext';
import { handleChange } from '../../commons';
import { ClipLoader } from 'react-spinners';

const Modal = ({setOpen}) => {

    const {user} = useAuth();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInfo(user);
    }, [user])

    const handleClick = async(e) => {
        e.preventDefault();
        setLoading(true);
        await handleUpdateUser(user, info, file, setOpen);
        setLoading(false);
    }

  return (

    <div className="modal">
        <div className="mContainer">

            <FontAwesomeIcon 
                icon={faXmark} 
                className="mClose"
                onClick={() => setOpen(false)}
            />

            <div className="modalContainer">
                <form>
                    <img
                        src={
                            (file) ? URL.createObjectURL(file)
                            : (info.profilePicture) ? info.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />

                    <div className="formInput">
                        <label htmlFor="file">
                        <FontAwesomeIcon className="icon" icon={faPen} />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="formInput">


                        <div className="txt_field">
                            <input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={(e) => handleChange(e, setInfo)}
                            id="username"
                            value={info.username}
                            required
                            />
                        </div>
                        <div className="txt_field">
                            <input
                            type="email"
                            placeholder="email"
                            name="email"
                            onChange={(e) => handleChange(e, setInfo)}
                            id="email"
                            value={info.email}
                            required
                            />
                        </div>
                        <div className="txt_field">
                            <input
                            type="text"
                            placeholder="Write bio"
                            name="desc"
                            value={info.desc}
                            onChange={(e) => handleChange(e, setInfo)}
                            id="desc"
                            />
                        </div>
                    </div>
                    {loading && <div className="post-loader" style={{fontSize: "1.1rem", marginBottom: "20px"}}>
                        <ClipLoader color="white" size={30} />
                        updating profile...
                        </div>
                    }
                    <button className='editButton' onClick={handleClick}>Edit</button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Modal