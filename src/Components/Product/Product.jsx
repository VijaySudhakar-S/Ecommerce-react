import React from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { FaRegHeart, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const addCart = (product) => {
    if (!isInCart) {
      dispatch(addItem(product));
      toast.success("Added to Cart!");
    }
  };

  const removeCart = (product) => {
    dispatch(removeItem(product));
    toast.info("Removed from Cart");
  };

  const addWishlistItem = (product) => {
    if (!isInWishlist) {
      dispatch(addwishlist(product));
      toast.success("Added to Wishlist!");
    }
  };

  const removeWishlistItem = (product) => {
    dispatch(removewishlist(product));
    toast.info("Removed from Wishlist");
  };

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.pic} 
            alt={product.name} 
            className="product-image"
          />
          
          {/* Wishlist Button */}
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={() => isInWishlist ? removeWishlistItem(product) : addWishlistItem(product)}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className="product-info">
          <h5 className="product-title">{product.name}</h5>
          <div className="product-price">₹ {product.amt}</div>
          
          {/* Cart Button */}
          {isInCart ? (
            <button 
              className="cart-btn remove-btn"
              onClick={() => removeCart(product)}
            >
              <FaTrash className="btn-icon" />
              Remove from Cart
            </button>
          ) : (
            <button 
              className="cart-btn add-btn"
              onClick={() => addCart(product)}
            >
              <FaShoppingCart className="btn-icon" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};