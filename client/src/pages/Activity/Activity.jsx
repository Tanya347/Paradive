import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import useFetch from '../../Hooks/useFetch'
import { Link, useLocation } from "react-router-dom"
import activities from './activities'
import './activity.css'

function Activity() {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data, loading } = useFetch(
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

    return (

        <div className='activityContainer'>
            <Navbar />
            <div className="activityPageHero">
                <h1>{activities[index].placeholder}</h1>
                <img src={activities[index].src} alt="" height="200px" />
                <p>{activities[index].desc}</p>
            </div>
            <div className="searchedPosts">
                {data ? (
                    <>
                        {
                            search(data).map((item, i) => (
                                <div className="card" key={item._id}>
                                    <div class="content">
                                        <img id="post-image" src={item.photos[0]} alt="" />
                                        <h4>{item.title}</h4>
                                        <h6>
                                            <span>Location : </span> {item.location}
                                        </h6>
                                        <h6>
                                            <span>Activity : </span> {item.type}
                                        </h6>
                                        <p>{item.desc}</p>
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