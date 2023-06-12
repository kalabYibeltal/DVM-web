import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
      <Box sx={{ color:'orange' }}> <h1  > DVM </h1> </Box>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">

        <div className="footer-section-columns">
          <span>096-8577-008</span>
          <span>kalab@aait.edu.et</span>
          <span>mikyeshete@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
