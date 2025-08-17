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
      <div className="product-container my-5 container text-center">
        <h4>Featured Products</h4>
        <div className="d-flex flex-wrap gap-4 mt-5 justify-content-around">
          {product.map((product) => (
            <Product key={product.id} product={product}/>
          ))}
        </div>
      </div>
    </>
  );
};
