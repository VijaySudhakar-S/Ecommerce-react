import React from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add this import
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { FaRegHeart, FaHeart, FaShoppingCart, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const addCart = (e) => {
    e.stopPropagation();
    if (!isInCart) {
      dispatch(addItem(product));
      toast.success("Added to Cart!");
    }
  };

  const removeCart = (e) => {
    e.stopPropagation(); 
    dispatch(removeItem(product));
    toast.info("Removed from Cart");
  };

  const addWishlistItem = (e) => {
    e.stopPropagation();
    if (!isInWishlist) {
      dispatch(addwishlist(product));
      toast.success("Added to Wishlist!");
    }
  };

  const removeWishlistItem = (e) => {
    e.stopPropagation(); 
    dispatch(removewishlist(product));
    toast.info("Removed from Wishlist");
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
      <div className="product-card h-100" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
        <div className="product-image-container">
          <img 
            src={product.pic} 
            alt={product.name} 
            className="product-image img-fluid"
          />
          
          {/* Wishlist Button */}
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={(e) => isInWishlist ? removeWishlistItem(e) : addWishlistItem(e)}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Quick View Button */}
          <button
            className="quick-view-btn"
            onClick={handleViewDetails}
            aria-label="Quick view product"
          >
            <FaEye />
          </button>
        </div>

        <div className="product-info d-flex flex-column">
          <h5 className="product-title">{product.name}</h5>
          <div className="product-price">₹ {product.amt}</div>
          
          {/* Cart Button */}
          {isInCart ? (
            <button 
              className="cart-btn remove-btn mt-auto"
              onClick={(e) => removeCart(e)}
            >
              <FaTrash className="btn-icon me-2" />
              Remove from Cart
            </button>
          ) : (
            <button 
              className="cart-btn add-btn mt-auto"
              onClick={(e) => addCart(e)}
            >
              <FaShoppingCart className="btn-icon me-2" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};  