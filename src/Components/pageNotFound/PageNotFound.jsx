import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
  return (
    <div className="notfound-container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg border-0 p-4 text-center notfound-card">
        <h1 className="display-4 fw-bold">🚧</h1>
        <h2 className="fw-bold mb-3">Page Under Construction</h2>
        <p className="mb-4">
          We’re working hard to bring you a better shopping experience.  
          Please check back soon.
        </p>
        <Link to="/" className="allItems-btn mx-auto">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
