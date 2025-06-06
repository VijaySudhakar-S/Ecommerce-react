import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "../../App";
import "./Cart.css";

export const Cart = () => {
  const { cart, setCart } = useContext(cartContext);
  const removeCart = (product) => {
    setCart(cart.filter((c) => c.id != product.id));
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cart.reduce((pre, curr) => pre + parseInt(curr.amt), 0));
  }, [cart]);
  return (
    <>
      <div className="my-5 container cart-container">
        <h4> Your Cart</h4>
        {cart.length > 0 ? (
          <>
            <div>
              {cart.map((product) => (
                <div className="cart-card d-flex justify-content-between align-items-center mt-4">
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
                      onClick={() => removeCart(product)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-end">
              <h6 className="total-amt">
                Total Amount : <span>₹ {total}</span>
              </h6>
            </div>
          </>
        ) : (
          <div className="mt-4 empty-cart-con">Your Cart is Empty..</div>
        )}
      </div>
    </>
  );
};
