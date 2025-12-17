import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Dashboard Icon */}
      <div className="mobile-menu-icon" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setOpen(false)}>
          X
        </span>
        <div className="sidebar-options">

          <NavLink to="/add" className="sidebar-option" onClick={() => setOpen(false)}>
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>

          <NavLink to="/list" className="sidebar-option" onClick={() => setOpen(false)}>
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>

          <NavLink to="/orders" className="sidebar-option" onClick={() => setOpen(false)}>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>

          <NavLink to="/users" className="sidebar-option" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <p>Users</p>
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
