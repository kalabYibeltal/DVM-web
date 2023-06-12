import React from "react";
import AboutBackground from "../../Assets/about-background.png";
import AboutBackgroundImage from "../../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Box from "@mui/material/Box";

const About = () => {
  const handleClick = () => {
    window.open('https://www.youtube.com/watch?v=MC7z6sjlqlQ', '_blank');
  };

  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img className="chips" src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">
             How to Buy
        </h1>
        <p className="primary-text">
          All you have to do to Purchase an Item from one of our 
          Vending machine is download our app from playstore and signup.
        </p>
        <p className="primary-text">
          After that scan the QR from the right side of the vending machine and start buying.
        </p>
        <div className="about-buttons-container">
          <button className="watch-video-button" onClick={handleClick}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <BsFillPlayCircleFill />  Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
