import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
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
      toast.success("🛒 Added to Cart!");
    }
  };

  const removeCart = (product) => {
    dispatch(removeItem(product));
    toast.info("❌ Removed from Cart");
  };

  const addWishlistItem = (product) => {
    if (!isInWishlist) {
      dispatch(addwishlist(product));
      toast.success("❤️ Added to Wishlist!");
    }
  };

  const removeWishlistItem = (product) => {
    dispatch(removewishlist(product));
    toast.info("💔 Removed from Wishlist");
  };

  return (
    <div className="product-card shadow-sm">
      <img src={product.pic} alt={product.name} />
      
      {/* Wishlist Icon */}
      {!isInWishlist ? (
        <button
          className="wishlist-btn"
          onClick={() => addWishlistItem(product)}
        >
          <FaRegHeart />
        </button>
      ) : (
        <button
          className="wishlist-btn active"
          onClick={() => removeWishlistItem(product)}
        >
          <FaHeart />
        </button>
      )}

      <h6 className="mt-3">{product.name}</h6>
      <p>₹ {product.amt}</p>

      {isInCart ? (
        <button className="removecart-btn" onClick={() => removeCart(product)}>
          Remove from Cart
        </button>
      ) : (
        <button className="addcart-btn" onClick={() => addCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};
