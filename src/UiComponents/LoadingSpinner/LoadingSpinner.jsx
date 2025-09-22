import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="wave-container">
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;