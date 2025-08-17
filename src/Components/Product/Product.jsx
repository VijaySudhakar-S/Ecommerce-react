import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist,removewishlist } from "../../store/wishlistSlice";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const Product = ({ product }) => {

  const cart = useSelector(state => { return state.cart})
  const wishlist = useSelector(state => {return state.wishlist})
  const dispatch = useDispatch()

  const addCart = (product) => {
    if (!(cart.includes(product))) dispatch(addItem(product))
  };

  const removeCart = (product) => {
    dispatch(removeItem(product))
  };

  const addWishlistItem = (product)=>{
    if (!(wishlist.includes(product))) dispatch(addwishlist(product))
  }

  const removeWishlistItem = (product) =>{
    dispatch(removewishlist(product))
  }


  return (
      <div className="product-card">
        <img src={product.pic} alt="" />
        {
          !(wishlist.includes(product)) ? (
            <button className="wishlist-btn" onClick={()=>addWishlistItem(product)}><FaRegHeart/></button>
          ) : (
            <button className="wishlist-btn" onClick={()=>removeWishlistItem(product)}> <FaHeart /></button>  
          )
        }
        <h6 className="mt-3 ">{product.name}</h6>
        <p>Price : ₹ {product.amt}</p>
        {cart.includes(product) ? (
          <button className="removecart-btn" onClick={()=>removeCart(product)}>
            Remove from Cart
          </button>
        ) : (
          <button className="addcart-btn" onClick={()=>addCart(product)}>
            Add to Cart
          </button>
        )}
      </div>
  );
};
