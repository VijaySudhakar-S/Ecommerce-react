import React, { useState } from "react";
import "./Home.css";
import { Slider } from "./Slider";
import data from "../../../DB.json";
import { Product } from "../Product/Product";

export const Home = () => {
  const [product, setProduct] = useState(data);
  return (
    <>
      <Slider />
      <div className="product-container my-5 container px-3">
        <div className="text-center mb-4">
          <h4>Featured Products</h4>
        </div>
        <div className="row g-3 justify-content-center">
          {product.map((product) => (
            <Product key={product.id} product={product}/>
          ))}
        </div>
      </div>
    </>
  );
};