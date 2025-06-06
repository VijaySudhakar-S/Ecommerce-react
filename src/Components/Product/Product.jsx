import React from "react";
import { useContext } from "react";
import { cartContext } from "../../App";

export const Product = ({ product }) => {
  const { cart, setCart } = useContext(cartContext);
  const addCart = () => {
    setCart([...cart, product]);
  };
  const removeCart = () => {
    setCart(cart.filter((c) => c.id != product.id));
  };
  return (
    <>
      <div className="product-card" key={product.id}>
        <img src={product.pic} alt="" />
        <h6 className="mt-3 ">{product.name}</h6>
        <p>Price : ₹ {product.amt}</p>
        {cart.includes(product) ? (
          <button className="removecart-btn" onClick={removeCart}>
            Remove from Cart
          </button>
        ) : (
          <button className="addcart-btn" onClick={addCart}>
            Add to Cart
          </button>
        )}
      </div>
    </>
  );
};
