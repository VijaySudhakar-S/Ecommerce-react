import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const addCart = (product) => {
    if (!isInCart) dispatch(addItem(product));
  };

  const removeCart = (product) => {
    dispatch(removeItem(product));
  };

  const addWishlistItem = (product) => {
    if (!isInWishlist) dispatch(addwishlist(product));
  };

  const removeWishlistItem = (product) => {
    dispatch(removewishlist(product));
  };

  return (
    <div className="product-card">
      <img src={product.pic} alt={product.name} />
      {!isInWishlist ? (
        <button
          className="wishlist-btn"
          onClick={() => addWishlistItem(product)}
        >
          <FaRegHeart />
        </button>
      ) : (
        <button
          className="wishlist-btn"
          onClick={() => removeWishlistItem(product)}
        >
          <FaHeart />
        </button>
      )}

      <h6 className="mt-3">{product.name}</h6>
      <p>Price : ₹ {product.amt}</p>

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
