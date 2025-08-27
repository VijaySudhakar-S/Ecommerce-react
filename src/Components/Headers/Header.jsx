import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiBagBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { CgMenuRightAlt } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import "./Header.css";

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const cartSelector = useSelector((state) => { return state.cart });
  const wishlistSelector = useSelector((state) => { return state.wishlist });

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <div className="container-fluid top-strip d-flex justify-content-center align-items-center">
        <FaShippingFast />
        <div className="ms-2">Free shipping on orders above ₹499</div>
      </div>
      
      <div className="navbar-con header">
        <div className="container">
          <div className="row py-3 align-items-center">
            
            <div className="col-4 d-lg-none d-flex align-items-center justify-content-start">
              <button className="btn p-2" onClick={toggleMobileMenu}>
                <CgMenuRightAlt size={24} />
              </button>
            </div>
            
            <div className="col-3 col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-start">
              <div className="logowrapper">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" className="img-fluid" />
                </Link>
              </div>
            </div>
            
            <div className="col-lg-4 d-none d-lg-flex align-items-center justify-content-center">
              <div className="searchwrapper d-flex align-items-center justify-content-between w-100">
                <input type="text" placeholder="Search for products..." className="flex-grow-1 border-0" />
                <GrSearch />
              </div>
            </div>
            
            <div className="col-5 col-lg-4 d-flex profilecartwrapper align-items-center justify-content-end">
            
              <div className="d-none d-sm-flex me-2">
                <Link to={"/profile"} className="circle d-flex align-items-center justify-content-center text-decoration-none">
                  <FaRegUser size={16} />
                </Link>
              </div>
              
              <div className="position-relative me-2">
                <Link to={"/wishlist"} className="circle d-flex align-items-center justify-content-center text-decoration-none">
                  <FaRegHeart size={16} />
                </Link>
                {wishlistSelector.length > 0 && (
                  <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {wishlistSelector.length}
                  </span>
                )}
              </div>
              
              <div className="position-relative">
                <Link to={"/cart"} className="circle d-flex align-items-center justify-content-center text-decoration-none">
                  <PiBagBold size={16} />
                </Link>
                {cartSelector.length > 0 && (
                  <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cartSelector.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-bottom"></div>
        <div className="p-3 d-lg-none align-items-center justify-content-center">
              <div className="searchwrapper d-flex align-items-center justify-content-between w-100">
                <input type="text" placeholder="Search for products..." className="flex-grow-1 border-0" />
                <GrSearch />
              </div>
        </div>
        <div className="container">
          <div className="allitems-con d-none d-lg-flex align-items-center justify-content-between">
            <div className="me-lg-3 me-xl-5 position-relative">
              <button className="allItems-btn d-flex align-items-center justify-content-between">
                <FiMenu />
                <span className="mx-2">ALL CATEGORIES</span>
                <MdKeyboardArrowDown />
              </button>
              <div className="allitems-box position-absolute">
                <Link to={"/albums"} className="text-decoration-none">Albums</Link>
                <Link to={"/chocolates"} className="text-decoration-none">Chocolates</Link>
                <Link to={"/frames"} className="text-decoration-none">Frames</Link>
                <Link to={"/keychain"} className="text-decoration-none">Key Chains</Link>
                <Link to={"/lamps"} className="text-decoration-none">Lamps</Link>
                <Link to={"/tshirts"} className="text-decoration-none">T-shirts</Link>
                <Link to={"/toys"} className="text-decoration-none">Toys</Link>
              </div>
            </div>
            <div className="nav-items d-flex justify-content-between flex-wrap">
              <Link to={"/"} className="text-decoration-none">home</Link>
              <Link to={"/all"} className="text-decoration-none">All</Link>
              <Link to={"/tshirts"} className="text-decoration-none">T-shirts</Link>
              <Link to={"/chocolates"} className="text-decoration-none">Chocolates</Link>
              <Link to={"/frames"} className="text-decoration-none">Frames</Link>
              <Link to={"/aboutus"} className="text-decoration-none">About Us</Link>
              <Link to={"/contactus"} className="text-decoration-none">Contact Us</Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu-overlay d-lg-none position-fixed top-0 start-0 w-100 h-100" style={{zIndex: 9999}}>
            <div className="mobile-menu bg-white position-absolute top-0 start-0 h-100 shadow" style={{width: '280px'}}>
              <div className="p-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Menu</h5>
                  <button className="btn p-1" onClick={toggleMobileMenu}>
                    <span className="fs-4">&times;</span>
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="mb-3">
                  <Link to={"/profile"} className="d-flex align-items-center text-decoration-none text-dark py-2">
                    <FaRegUser className="me-3" size={16} />
                    Profile
                  </Link>
                </div>
                <hr />
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Categories</h6>
                  <Link to={"/albums"} className="d-block text-decoration-none text-dark py-2">Albums</Link>
                  <Link to={"/chocolates"} className="d-block text-decoration-none text-dark py-2">Chocolates</Link>
                  <Link to={"/frames"} className="d-block text-decoration-none text-dark py-2">Frames</Link>
                  <Link to={"/keychain"} className="d-block text-decoration-none text-dark py-2">Key Chains</Link>
                  <Link to={"/lamps"} className="d-block text-decoration-none text-dark py-2">Lamps</Link>
                  <Link to={"/tshirts"} className="d-block text-decoration-none text-dark py-2">T-shirts</Link>
                  <Link to={"/toys"} className="d-block text-decoration-none text-dark py-2">Toys</Link>
                </div>
                <hr />
                <div>
                  <h6 className="text-muted mb-3">Navigation</h6>
                  <Link to={"/"} className="d-block text-decoration-none text-dark py-2">Home</Link>
                  <Link to={"/all"} className="d-block text-decoration-none text-dark py-2">All Products</Link>
                  <Link to={"/aboutus"} className="d-block text-decoration-none text-dark py-2">About Us</Link>
                  <Link to={"/contactus"} className="d-block text-decoration-none text-dark py-2">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};