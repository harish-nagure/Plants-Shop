import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState('Home');
    const [sidebarOpen, setSidebarOpen] = useState(false); // <-- New State
    const { getTotalCartAmount, token, setToken, username,clearCart } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username"); 
        setToken("");
        navigate("/");
        clearCart();
    };

    return (
        <>
        {/* NAVBAR MAIN */}
        <div className='navbar' id='navbar'>
            
            <Link to="/"><img src={assets.logo2} alt="" className='logo' /></Link>

            <ul className="navbar-menu">
                <HashLink smooth to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</HashLink>
                <HashLink smooth to="/#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Plants</HashLink>
                <HashLink smooth to="/#app-download" onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</HashLink>
                <HashLink smooth to="/#footer" onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact Us</HashLink>
            </ul>

            <div className="navbar-right">

                <HashLink smooth to="/#explore-menu">
                    <img src={assets.search_icon} alt="" />
                </HashLink>

                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {/* Dashboard Icon (Mobile Only) */}
                <img 
                    src={assets.menu_icon}
                    alt="menu"
                    className="dashboard-icon"
                    onClick={() => setSidebarOpen(true)}
                />

                {!token ?
    <button className="desktop-login" onClick={() => setShowLogin(true)}>Sign In</button>
    :
    <div className='navbar-profile desktop-profile'>
    <div className="profile-wrapper">
        <img src={assets.profile_icon} alt="profile" />
        <span className="profile-name">
            {localStorage.getItem("username")}
        </span>
    </div>

    <ul className='navbar-profile-dd'>

            <li onClick={() => navigate('/MyOrders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Log Out</p>
            </li>
        </ul>
    </div>
}

            </div>
        </div>


        {/* 📌 SIDEBAR FOR MOBILE SCREENS */}
        <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)}></div>

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <span className="close-btn" onClick={() => setSidebarOpen(false)}>×</span>

            <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
            <HashLink smooth to="/#explore-menu" onClick={() => setSidebarOpen(false)}>Plants</HashLink>
            <HashLink smooth to="/#app-download" onClick={() => setSidebarOpen(false)}>Mobile-App</HashLink>
            <HashLink smooth to="/#footer" onClick={() => setSidebarOpen(false)}>Contact</HashLink>

            <hr />

            {!token ?
                <button className="mobile-login" onClick={() => { setShowLogin(true); setSidebarOpen(false); }}>Sign In</button>
                :
                <>
                    <p onClick={() => navigate('/MyOrders')}>My Orders</p>
                    <p onClick={logout}>Logout</p>
                </>
            }
        </div>
        </>
    );
};

export default Navbar;
