import React, { useState, useEffect } from "react";
import "./Slider.css";

const banners = [
  "https://img.freepik.com/free-vector/christmas-sale-banner-with-realistic-presents-blue-golden_1361-3105.jpg?t=st=1733929480~exp=1733933080~hmac=bc3120bfcb3e1dd25dcad59c2fee7ce13837ee8a638e6e0c1b198f595908ff4d&w=1380",
  "https://img.freepik.com/free-vector/merry-christmas-sale-banner-with-realistic-golden-gift_1361-2952.jpg?t=st=1733932521~exp=1733936121~hmac=6fa2b809e691f0fa2ea5519394d820af71b9c783a3cc7f45f96893d28b0c85cc&w=1380 ",
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };


  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 7000); 
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, 
        }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
      <button className="prev-btn" onClick={prevSlide}>
        &#10094; 
      </button>
      <button className="next-btn" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};
