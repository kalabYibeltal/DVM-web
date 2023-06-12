import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home2 = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container"> 
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Digital Vending Machine
          </h1>
          <p className="primary-text">
            This is one of a kind Vending machine in africa. Initially devloped by two aspiring young Ethiopian Addis Ababa 
            University Students For their Bachelor degree semester Project. Now a multi-million company one the path to be a 
            billion dollar company. 
          </p>  
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home2;
