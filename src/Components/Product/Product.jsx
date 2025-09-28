import React from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { 
  FaRegHeart, 
  FaHeart, 
  FaShoppingCart, 
  FaTrash, 
  FaEye, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar 
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item?._id === product?._id);
  const isInWishlist = wishlist.some((item) => item?._id === product?._id);

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

  const addWishlistItem = (e,product) => {
    e.stopPropagation();
    if (!isInWishlist) {
      dispatch(addwishlist(product));
      toast.success("Added to Wishlist!");
    }
  };

  const removeWishlistItem = (e,product) => {
    e.stopPropagation(); 
    dispatch(removewishlist(product));
    toast.info("Removed from Wishlist");
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  // ⭐ Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }
    return stars;
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
            onClick={(e) => isInWishlist ? removeWishlistItem(e,product) : addWishlistItem(e,product)}
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

          {/* Rating */}
          <div className="rating-section d-flex align-items-center mb-2">
            <div className="stars">{renderStars(product.rating || 0)}</div>
            <span className="rating-text ms-2">
              ({product.reviewsCount || 0})
            </span>
          </div>
          
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
