import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaArrowRight,
  FaShippingFast, 
  FaShieldAlt, 
  FaHeadset, 
  FaUndo
} from 'react-icons/fa';
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import './Footer.css';

const Footer = () => {
  return (
    <>
      {/* Features Strip*/}
      <div className="features-strip">
        <div className="container px-3">
            <div className="row py-4 g-3 mx-auto justify-content-center">
            
            <div className="col-lg-3 col-md-6 feature-block-wrapper">
                <div className="d-flex align-items-center">
                    <div className="feature-icon me-3">
                        <FaShippingFast />
                    </div>
                    <div className="text-start feature-text">
                        <h6 className="mb-1 fw-600">Free Shipping</h6>
                        <small className="text-muted">On orders above ₹499</small>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-6 feature-block-wrapper">
                <div className="d-flex align-items-center">
                    <div className="feature-icon me-3">
                        <FaShieldAlt />
                    </div>
                    <div className="text-start feature-text">
                        <h6 className="mb-1 fw-600">Secure Payment</h6>
                        <small className="text-muted">100% secure checkout</small>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-6 feature-block-wrapper">
                <div className="d-flex align-items-center">
                    <div className="feature-icon me-3">
                        <FaHeadset />
                    </div>
                    <div className="text-start feature-text">
                        <h6 className="mb-1 fw-600">24/7 Support</h6>
                        <small className="text-muted">Dedicated customer care</small>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-6 feature-block-wrapper">
                <div className="d-flex align-items-center">
                    <div className="feature-icon me-3">
                        <FaUndo />
                    </div>
                    <div className="text-start feature-text">
                        <h6 className="mb-1 fw-600">Easy Returns</h6>
                        <small className="text-muted">7-day return policy</small>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="main-footer">
        <div className="container px-3">
          <div className="row py-5 gy-4">
            
            {/* Brand Section */}
            <div className="col-lg-4 col-md-12">
              <div className="text-center text-lg-start">
                <h2 className="brand-logo mb-3">VS GIFTS</h2>
                <p className="text-muted mb-4 px-3 px-lg-0">
                  Curating unique and thoughtful presents that create lasting memories for every special occasion.
                </p>
                
                {/* Social Media */}
                <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-4">
                  <a href="#" className="social-btn">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-btn">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-btn">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-btn">
                    <FaLinkedinIn />
                  </a>
                </div>

                {/* Contact Info */}
                <div className="contact-info text-center text-lg-start">
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-2">
                    <IoMailOutline className="text-primary me-2" />
                    <span className="small">info@vsgifts.com</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                    <IoCallOutline className="text-primary me-2" />
                    <span className="small">+91 8667096760</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shop Links */}
            <div className="col-lg-2 col-md-4 col-6 d-flex justify-content-center">
              <div className="text-center text-md-start">
                <h6 className="footer-title mb-3">SHOP</h6>
                <ul className="list-unstyled footer-links">
                  <li><Link to="/all">All Products</Link></li>
                  <li><Link to="/tshirts">T-shirts</Link></li>
                  <li><Link to="/chocolates">Chocolates</Link></li>
                  <li><Link to="/frames">Frames</Link></li>
                  <li><Link to="/albums">Albums</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Support Links */}
            <div className="col-lg-2 col-md-4 col-6 d-flex justify-content-center">
              <div className="text-center text-md-start">
                <h6 className="footer-title mb-3">SUPPORT</h6>
                <ul className="list-unstyled footer-links">
                  <li><Link to="/aboutus">About Us</Link></li>
                  <li><Link to="/contactus">Contact</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/returns">Returns</Link></li>
                  <li><Link to="/shipping">Shipping</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="col-lg-4 col-md-4 d-flex justify-content-center justify-content-lg-start">
              <div className="text-center text-md-start">
                <h6 className="footer-title mb-3">STAY UPDATED</h6>
                <p className="text-muted mb-3 small">Subscribe for exclusive offers and new arrivals</p>
                
                <div className="newsletter-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email"
                    />
                    <button className="btn newsletter-btn" type="button">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container px-3">
            <div className="row py-3 align-items-center">
              <div className="col-md-6 text-center d-flex justify-content-center">
                <small className="text-muted">
                  © {new Date().getFullYear()} VS Gifts. All rights reserved.
                </small>
              </div>
              <div className="col-md-6 text-center text-md-end mt-2 mt-md-0 d-flex justify-content-center">
                <Link to="/privacy" className="small text-muted text-decoration-none me-3">Privacy Policy</Link>
                <Link to="/terms" className="small text-muted text-decoration-none">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;