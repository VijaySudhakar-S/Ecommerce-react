import React, { useState, useEffect } from "react";
import api from "../../api";
import "./Home.css";
import { Slider } from "./Slider";
import { Product } from "../Product/Product";
import { ProductSkeleton } from "../../UiComponents/ProductSkeleton/ProductSkeleton";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
      <Slider />
      <div className="product-container my-5 container px-3">
        <div className="text-center mb-4">
          <h4>Featured Products</h4>
        </div>
        <div className="row g-3 justify-content-center">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </div>
      </div>
    </>
  );
};
