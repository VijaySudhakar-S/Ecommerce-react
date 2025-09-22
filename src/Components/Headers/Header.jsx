import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiBagBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import "./Header.css";

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  
  const cartSelector = useSelector((state) => state.cart);
  const wishlistSelector = useSelector((state) => state.wishlist);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    document.body.style.overflow = showMobileMenu ? 'auto' : 'hidden';
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  return (
    <>
      {/* Top Strip */}
      <div className="top-strip">
        <div className="container-fluid px-3">
          <div className="d-flex justify-content-center align-items-center py-2">
            <FaShippingFast className="me-2" />
            <span>Free shipping on orders above ₹499</span>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="main-header shadow-lg">
        <div className="container px-3">
          <nav className="d-flex align-items-center justify-content-between py-3">
            
            {/* Left Section - Mobile Menu + Search */}
            <div className="d-flex align-items-center">
              <button 
                className={`mobile-menu-toggle d-lg-none me-3 ${showMobileMenu ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              
              <button 
                className="search-toggle"
                onClick={toggleSearchPopup}
                aria-label="Search"
              >
                <GrSearch size={20} />
              </button>
            </div>
            
            {/* Center - Logo */}
            <Link to="/" className="logo-container">
              <img src={Logo} alt="Logo" className="logo m-auto" />
            </Link>
            
            {/* Right Section - Actions */}
            <div className="d-flex align-items-center gap-2">
              <Link to="/profile" className="action-btn d-none d-md-flex">
                <FaRegUser size={18} />
              </Link>
              
              <Link to="/wishlist" className="action-btn position-relative">
                <FaRegHeart size={18} />
                {wishlistSelector.length > 0 && (
                  <span className="item-count">{wishlistSelector.length}</span>
                )}
              </Link>
              
              <Link to="/cart" className="action-btn position-relative">
                <PiBagBold size={18} />
                {cartSelector.length > 0 && (
                  <span className="item-count">{cartSelector.length}</span>
                )}
              </Link>
            </div>
          </nav>
        </div>
        
        {/* Navigation Menu (Desktop) */}
        <div className="navigation-menu d-none d-lg-block border-top">
          <div className="container-fluid px-3">
            <div className="d-flex justify-content-center py-3">
              <div className="nav-links d-flex gap-5">
                <Link to="/">Home</Link>
                <Link to="/all">All Products</Link>
                <Link to="/tshirts">T-shirts</Link>
                <Link to="/chocolates">Chocolates</Link>
                <Link to="/frames">Frames</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Search Popup */}
      <div className={`search-popup shadow-lg ${showSearchPopup ? 'show' : ''}`}>
        <div className="container px-3 py-4">
          <div className="search-popup-content">
            <div className="d-flex align-items-center">
              <div className="search-wrapper flex-grow-1 me-3">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-100 border-0 px-4 py-3"
                  autoFocus
                />
              </div>
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleSearchPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${showMobileMenu ? 'show' : ''}`} onClick={toggleMobileMenu}>
        <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
          
          {/* Mobile Menu Header */}
          <div className="mobile-menu-header d-flex justify-content-between align-items-center p-4 border-bottom">
            <h5 className="mb-0 fw-bold">Menu</h5>
            <button 
              className="btn p-0"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* Mobile Menu Content */}
          <div className="mobile-menu-content p-4">
            
            {/* Profile Link */}
            <Link to="/profile" className="mobile-link d-flex align-items-center py-3 text-decoration-none" onClick={toggleMobileMenu}>
              <FaRegUser className="me-3" />
              Profile
            </Link>
            
            <hr className="my-3" />
            
            {/* Categories */}
            <div className="mb-4">
              <h6 className="section-title text-muted mb-3">Categories</h6>
              <Link to="/albums" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Albums</Link>
              <Link to="/chocolates" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Chocolates</Link>
              <Link to="/frames" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Frames</Link>
              <Link to="/keychain" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Key Chains</Link>
              <Link to="/lamps" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Lamps</Link>
              <Link to="/tshirts" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>T-shirts</Link>
              <Link to="/toys" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Toys</Link>
            </div>
            
            <hr className="my-3" />
            
            {/* Navigation */}
            <div>
              <h6 className="section-title text-muted mb-3">Navigation</h6>
              <Link to="/" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/all" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>All Products</Link>
              <Link to="/aboutus" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>About Us</Link>
              <Link to="/contactus" className="mobile-link d-block py-2 text-decoration-none" onClick={toggleMobileMenu}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};