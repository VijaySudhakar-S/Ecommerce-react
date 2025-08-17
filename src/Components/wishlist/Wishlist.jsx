import React, { useEffect, useState} from "react";
import "../cart/Cart.css"
import { useDispatch, useSelector } from "react-redux";
import { removewishlist } from "../../store/wishlistSlice";

export const Wishlist = () => {

  const wishlistProducts = useSelector((state)=>state.wishlist)
  const dispatch = useDispatch()
  const removeWishlistItem = (product) =>{
    dispatch(removewishlist(product))
  }
  return (
    <>
      <div className="my-5 container cart-container">
        <h4> Your Wishlist</h4>
        {wishlistProducts.length > 0 ? (
          <>
            <div>
              {wishlistProducts.map((product) => (
                <div key={product.id} className="cart-card d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex">
                    <div>
                      <img src={product.pic} alt="image" />
                    </div>
                    <div className="ms-3 m-auto">
                      <h6>{product.name}</h6>
                      <p>Price : ₹ {product.amt}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="removecart-btn me-3"
                      onClick={() => removeWishlistItem(product)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-4 empty-cart-con">Your Wishlist is Empty..</div>
        )}
      </div>
    </>
  );
};
