import React, { useState } from 'react'
import "../EditProfile/editProfile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import { handleChange } from '../../commons';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({setResetOpen}) => {

    const {logout} = useAuth();
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/updatePassword`, info, {withCredentials: true});
            if(res.data.status === 'success') {
                await logout("Password Changed. Login again!");
                navigate('/login')
            }
        }
        catch(err) {
            const errorMessage = err.response?.data?.message || "Something went wrong. Failed to reset password.";
            toast.error(errorMessage);
            console.error(err);
            throw err;
        }
        finally {
            setLoading(false); 
        }
    }

    return (
        <div className="modal">
            <div className="mContainer">
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="mClose"
                    onClick={() => setResetOpen(false)}
                />
                <div className="modalContainer">
                    <form>
                        <div className="formInput">
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="Current password"
                                    name="passwordCurrent"
                                    onChange={(e) => handleChange(e, setInfo)}
                                    id="passwordCurrent"
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="New password"
                                    name="password"
                                    onChange={(e) => handleChange(e, setInfo)}
                                    id="password"
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    name="passwordConfirm"
                                    onChange={(e) => handleChange(e, setInfo)}
                                    id="passwordConfirm"
                                />
                            </div>
                        </div>
                        {loading && <div className="post-loader" style={{fontSize: "1.1rem", marginBottom: "20px"}}>
                            <ClipLoader color="white" size={30} />
                            updating profile...
                            </div>
                        }
                        <button className='editButton' onClick={handleClick}>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ResetPassword;