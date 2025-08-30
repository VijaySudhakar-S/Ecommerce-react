import React, { useEffect, useState} from "react";
import "./Cart.css";
import { removeItem } from "../../store/cartSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = () => {
  const dispatch = useDispatch()
  const cartProducts = useSelector((state)=>{return state.cart})
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartProducts.reduce((pre, curr) => pre + parseInt(curr.amt), 0));
  }, [cartProducts]);

  const removeCart = (product) =>{
    dispatch(removeItem(product))
    toast.info("Removed from Cart");
  }
  return (
    <>
      <div className="my-5 container cart-container">
        <h4> Your Cart</h4>
        {cartProducts.length > 0 ? (
          <>
            <div>
              {cartProducts.map((product) => (
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
