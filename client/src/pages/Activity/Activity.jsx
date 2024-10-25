import React, { useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import useFetch from '../../apis/useFetch'
import { Link, useLocation } from "react-router-dom"
import activities from './activities'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './activity.css'

function Activity() {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data } = useFetch(
        "/posts"
    );

    let index;

    for (let i = 0; i < activities.length; i++) {
        if (activities[i].type === id)
            index = i;
    }

    const keys = ["type"]

    const search = (data) => {
        return data.filter(
            (item) => keys.some(key => item[key].toLowerCase().includes(id))
        )
    }

    useEffect(() => {
        Aos.init({duration: 1000});
      },[])

    return (

        <div className='activityContainer'>
            <Navbar />
            <div className="header"></div>
            <div className="activityPageHero">
                <h1>{activities[index].placeholder}</h1>
                <p>{activities[index].desc}</p>
            </div>
            <div className="searchedPosts">
                {data ? (
                    <>
                        {
                            search(data)?.map((item, i) => (
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
                            ))
                        }
                    </>
                ) : (
                    <><p style={{ color: "white", padding: "10px 0" }}>No content to display</p></>
                )}
            </div>


            <Footer />
        </div>
    )
}

export default Activity