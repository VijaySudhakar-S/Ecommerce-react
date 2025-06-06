import React from "react";
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

export const Header = ({ cart }) => {
  return (
    <>
      <div className="container-fluid top-strip d-flex justify-content-center align-items-center">
        <FaShippingFast />
        <div> Free shipping on orders above ₹499</div>
      </div>
      <div className=" navbar-con header">
        <div className=" container">
          <div className="row py-3">
            <div className="col-4 d-lg-none d-flex align-items-center justify-content-start menu-btn">
              <button>
                <CgMenuRightAlt />
              </button>
            </div>
            <div className="col-3 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start">
              <div className="logowrapper">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4  d-none d-lg-flex align-items-center justify-content-center">
              <div className="searchwrapper d-flex align-items-center justify-content-between">
                <input type="text" placeholder="Search for products..." />
                <GrSearch />
              </div>
            </div>
            <div className="col-5 col-lg-4  d-flex profilecartwrapper align-items-center justify-content-end">
              <div className="circle">
                <Link to={"profile"}>
                  <FaRegUser />
                </Link>
              </div>
              <div className="circle">
                <Link to={"/wishlist"}>
                  <FaRegHeart />
                </Link>
              </div>
              <div className="circle position-relative">
                <Link to={"/cart"}>
                  <PiBagBold />
                </Link>
                <span className="cart-count">{cart.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="container">
          <div className="allitems-con d-none d-lg-flex align-items-center justify-content-between">
            <div className="me-lg-3 me-xl-5">
              <button className="allItems-btn d-flex align-items-center justify-content-between">
                <FiMenu />
                <span className="mx-2">ALL CATERGORIES</span>
                <MdKeyboardArrowDown />
              </button>
              <div className="allitems-box">
                <Link to={"/albums"}>Albums</Link>
                <Link to={"/chocolates"}>Chocolates</Link>
                <Link to={"/frames"}>Frames</Link>
                <Link to={"/keychain"}>Key Chains</Link>
                <Link to={"/lamps"}>Lamps</Link>
                <Link to={"/tshirts"}>T-shirts</Link>
                <Link to={"/toys"}>Toys</Link>
              </div>
            </div>
            <div className="nav-items d-flex justify-content-between">
              <Link to={"/"}>home</Link>
              <Link to={"/all"}>All</Link>
              <Link to={"/tshirts"}>T-shirts</Link>
              <Link to={"/chocolates"}>Chocolates</Link>
              <Link to={"/frames"}>Frames</Link>
              <Link to={"/aboutus"}>About Us</Link>
              <Link to={"/contactus"}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
