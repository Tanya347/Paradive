import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/card/Card";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import PostCard from "../../components/PostCard/PostCard";
import { actions, activities } from "./content";

import "./HomePage.css";
import { Link } from "react-router-dom"


function HomePage() {



  return (
    <div className="HomePage">
      <Navbar />
      <div className="landing">
        <div className="hero">
          <div className="heroBackground">
            <img
              src={process.env.PUBLIC_URL + "/Assets/canoeing.jpg"}
              alt=""
            />
          </div>
          <div className="heroContent">
            <img src={process.env.PUBLIC_URL + "/Assets/hero.png"} alt="" />
            <p>Bored this summer? Want to go out? Don't know where to go? What to do?
              Paradive has you covered. We are a community that allows everyone to share
              their experiences!
              You can view what others have been upto this summer and draw inspiration as well as share your own experiences...
            </p>
          </div>
        </div>
        <div className="featuredActivities">
          <div className="activities">

            <ActivityCard 
              key={activities[0].id}
              src={activities[0].src}
              name={activities[0].name}
              link={activities[0].link}
            />
            <ActivityCard 
              key={activities[1].id}
              src={activities[1].src}
              name={activities[1].name}
              link={activities[1].link}
            />
            <ActivityCard 
              key={activities[2].id}
              src={activities[2].src}
              name={activities[2].name}
              link={activities[2].link}
            />
          </div>
          <Link to="all">
            <button className="viewMore">View More</button>
          </Link>
        </div>
        <div className="featuredPosts">
          <div className="postBackground">

            <PostCard />
          </div>
        </div>
        <div className="actionCards">
          <div className="cards">
            <Card
              src={actions[0].src}
              para={actions[0].para}
              button={actions[0].button}
              link={actions[0].link}
            />
            <Card
              src={actions[1].src}
              para={actions[1].para}
              button={actions[1].button}
              link={actions[1].link}
            />
            <Card
              src={actions[2].src}
              para={actions[2].para}
              button={actions[2].button}
              link={actions[2].link}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
