import React from 'react';
import './ProductSkeleton.css';

export const ProductSkeleton = () => {
  return (
    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};