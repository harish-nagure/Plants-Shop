import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={assets.logo2} alt="" />
      </div>
      <div className="logo-container-header">
        <p>Admin Panel</p>
      </div>
      <div className="logo-container-profile">
        <img className="profile" src={assets.profile_image} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
