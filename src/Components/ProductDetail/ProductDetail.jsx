import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSliceReducer";
import { addwishlist, removewishlist } from "../../store/wishlistSlice";
import { 
  FaRegHeart, 
  FaHeart, 
  FaShoppingCart, 
  FaTrash, 
  FaStar, 
  FaStarHalfAlt,
  FaRegStar,
  FaArrowLeft,
  FaShare,
  FaPlus,
  FaMinus,
  FaShippingFast,
  FaUndo,
  FaShieldAlt
} from "react-icons/fa";
import { toast } from "react-toastify";
import data from "../../../DB.json";
import "./ProductDetail.css";
import { Product } from "../Product/Product";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = data.find(item => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const related = data.filter(item => item.id !== parseInt(id)).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const productImages = [
    product.pic,
    product.pic,
    product.pic
  ];

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addItem({ ...product, quantity }));
      toast.success(`Added ${quantity} item(s) to cart!`);
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(product));
    toast.info("Removed from cart");
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removewishlist(product));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addwishlist(product));
      toast.success("Added to wishlist!");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }
    return stars;
  };

  return (
    <div className="product-detail-page pt-3">
      <div className="container px-3 py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button className="btn-link" onClick={() => navigate('/')}>
                <FaArrowLeft className="me-2" />
                Back to Products
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="container px-3">
        <div className="row g-4">
          {/* Product Images */}
          <div className="col-lg-6 ">
            <div className="product-images-section mx-auto">
              {/* Main Image */}
              <div className="main-image-container">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="main-product-image"
                />
                <button 
                  className="share-btn"
                  onClick={() => toast.info("Share")}
                >
                  <FaShare />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="thumbnail-container">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 p-2 p-lg-0">
            <div className="product-info-section">
              <h1 className="product-title-dt">{product.name}</h1>
              
              {/* Rating */}
              <div className="rating-section">
                <div className="stars">
                  {renderStars(4.5)}
                </div>
                <span className="rating-text">(4.5) • 128 reviews</span>
              </div>

              {/* Price */}
              <div className="price-section">
                <span className="current-price">₹ {product.amt}</span>
                <span className="original-price">₹ {Math.floor(product.amt * 1.3)}</span>
                <span className="discount">23% OFF</span>
              </div>

              {/* Description */}
              <div className="description-section">
                <h3>Product Description</h3>
                <p>
                  Premium quality {product.name.toLowerCase()} crafted with attention to detail. 
                  Perfect for gifting or personal use. Made with high-quality materials that ensure 
                  durability and style. This product combines functionality with aesthetic appeal, 
                  making it an excellent choice for modern lifestyles.
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-section">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                {isInCart ? (
                  <button 
                    className="btn btn-danger btn-lg me-3"
                    onClick={handleRemoveFromCart}
                  >
                    <FaTrash className="me-2" />
                    Remove from Cart
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary btn-lg me-3"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </button>
                )}
                
                <button 
                  className={`btn btn-outline-danger btn-lg ${isInWishlist ? 'active' : ''}`}
                  onClick={handleWishlist}
                >
                  {isInWishlist ? <FaHeart className="me-2" /> : <FaRegHeart className="me-2" />}
                  {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Features */}
              <div className="features-section">
                <div className="feature-item">
                  <FaShippingFast className="feature-icon" />
                  <div>
                    <strong>Free Shipping</strong>
                    <small>On orders above ₹500</small>
                  </div>
                </div>
                <div className="feature-item">
                  <FaUndo className="feature-icon" />
                  <div>
                    <strong>Easy Returns</strong>
                    <small>7 days return policy</small>
                  </div>
                </div>
                <div className="feature-item">
                  <FaShieldAlt className="feature-icon" />
                  <div>
                    <strong>Secure Payment</strong>
                    <small>100% secure transactions</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products-section mt-5">
          <h2 className="section-title-dt py-3 py-lg-5">You might also like</h2>
          <div className="row g-3">
            {relatedProducts.map((relatedProduct) => (
              <Product key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};