import React, { useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import useFetch from '../../apis/useFetch'
import { Link, useLocation } from "react-router-dom"
import activities from './activities'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './activity.css'
import { ClipLoader } from 'react-spinners'

export const Activity = () => {

    const location = useLocation();
    const tag = location.pathname.split("/")[2];

    const { data, loading } = useFetch(
        `/posts?tag=${tag}`
    );

    useEffect(() => {
        Aos.init({duration: 1000});
      },[])

      console.log(activities[tag])

    return (

        <div className='activityContainer'>
            <Navbar />
            <div className="header"></div>
            <div className="activityPageHero">
                <h1>{activities[tag].placeholder}</h1>
                <p>{activities[tag].desc}</p>
            </div>
            <div className="searchedPosts">
                {!loading ? (
                    <>
                        {data.length > 0 ? (
                            <>
                               {data?.map((item, i) => (
                                    <div className="card" key={item._id} data-aos="fade-up">
                                        <div class="content">
                                            <img id="post-image" src={item.photos[0]} alt="no content" />
                                            <h4>{item.title}</h4>
                                            <h6>
                                                <span>Location : </span> {item.location}
                                            </h6>
                                            <h6>
                                                <span>Activity : </span> {item.type}
                                            </h6>
                                            <p>{item.desc.slice(0, 60)}...</p>
                                            <Link to={`/${item._id}`}>
                                                <button>Read More</button>
                                            </Link>
                                        </div>
                                    </div >
                                ))}
                            </>
                        ) : (
                            <><p style={{ color: "white", padding: "10px 0" }}>No content to display</p></>
                        )
                        }
                    </>
                ) : (
                    <><ClipLoader color="white" size={40} /></>
                )}
            </div>


            <Footer />
        </div>
    )
}