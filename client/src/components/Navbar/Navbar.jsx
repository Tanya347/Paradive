import './navbar.css'
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    };

    const navigate = useNavigate();

    const {user, logout} = useAuth();
    
    const handleClick = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/')
    }

    window.addEventListener('scroll', changeBackground)

    return (
        <div className={navbar ? 'navContainer active' : 'navContainer'}>
            <Link to="/"> 
                <p className='navLogo'><img src={process.env.PUBLIC_URL + "/Assets/brand.png"} alt="" /></p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar"><FontAwesomeIcon icon={faBars} className="icon" /></label>
            <nav className='navbar'>
                <ul>
                    <Link to="/explore">
                        <li><p>Explore</p></li>
                    </Link>
                    <Link to="/new">
                        <li><p>New Post</p></li>
                    </Link>
                    {user ? (<>

                        <li onClick={handleClick} style={{ cursor: "pointer" }}><p>Logout</p></li>
                        <Link to={`/user/${user._id}`}>
                            <li><div className="profilePicture">
                                <img src={user.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
                            </div></li>
                            <li id="usernamename"><p>{user.username}</p></li>
                        </Link>
                    </>
                    )
                        :
                        (
                            <>
                                <Link to="/register">
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to="/login">
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div >
    )
}

export default Navbar