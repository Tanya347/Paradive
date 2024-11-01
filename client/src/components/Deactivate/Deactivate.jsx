import React from 'react'
import "../EditProfile/editProfile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Deactivate = ({setOpen, id}) => {

    const { deactivate } = useAuth();
    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();
        try {
            await deactivate();
            navigate('/')
        }
        catch(err) {
            const errorMessage = err.response?.data?.message || "Something went wrong. Failed to deactivate account.";
            toast.error(errorMessage);
            console.error(err);
            throw err;
        }
        setOpen(false); 
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
                    <p style={{ marginBottom: "20px"}}>Are you sure you want to deactivate your account? You will lose all your posts and user activity forever!</p>
                    <button className='editButton' onClick={handleClick}>Deactivate</button>
                </div>
            </div>
        </div>
    )

}

export default Deactivate