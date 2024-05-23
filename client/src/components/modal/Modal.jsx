import React, { useEffect } from 'react'
import "./modal.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/authContext';

const Modal = ({setOpen}) => {

    const {user, dispatch} = useContext(AuthContext);
    const [info, setInfo] = useState({});
    const [file, setFile] = useState("");

    useEffect(() => {
        setInfo(user);
    }, [user])

    const handleChange = (e) => {
        setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async(e) => {
        e.preventDefault();

        if(file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload")

            try {
                const uploadRes = await axios.post(
                  "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
                  data, { withcredentials: false }
                );
                
                const {url} = uploadRes.data;
                const newuser = {
                    ...info, profilePicture: url
                }

                process.env.REACT_APP_MODE === "development" ? 
                (await axios.put(`/users/${user._id}`, newuser, {withcredentials: false})) 
                : (
                    await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, 
                    newuser , 
                    {withcredentials: false})
                )
                setOpen(false);
                window.location.reload();

                dispatch({ type: "LOGIN_SUCCESS", payload: newuser });

            }
            catch(err) {
                console.log(err);
            }
        }

        else {
            try {
                process.env.REACT_APP_MODE === "development" ? 
                (await axios.put(`/users/${user._id}`, info, {withcredentials: false})) 
                : (
                    await axios.put(`https://paradive.onrender.com/api/users/${user._id}`, 
                    info, 
                    {withcredentials: false})
                    )
                setOpen(false);
                window.location.reload();
                dispatch({ type: "LOGIN_SUCCESS", payload: info });

            }
            catch (err) {
                console.log(err)
            }
        }
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            id="desc"
                            //   value={data.desc}
                            />
                        </div>
                    </div>
                    
                    <button className='editButton' onClick={handleClick}>Edit</button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Modal