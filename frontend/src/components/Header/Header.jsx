import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
const Header = () => {
    const navigate = useNavigate();
const handleBrowse = () => {
    const section = document.getElementById("explore-menu");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="header" id="header">
      <div className="header-content">
        <h2>Order your favorite plants here!</h2>
        <p>
          Fresh plants, delivered straight to your home! Looking to brighten
          your space or start a garden? Whether it's indoor greenery, flowering
          plants, or rare exotic species, we bring the best nurseries right to
          you. Shop now and enjoy healthy, vibrant plants without leaving your
          home!
        </p>
        <button onClick={handleBrowse}>Browse Plants</button>
      </div>
    </div>
  );
};

export default Header;
