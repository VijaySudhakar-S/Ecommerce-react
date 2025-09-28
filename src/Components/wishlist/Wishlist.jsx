import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { removewishlist, setWishlist } from "../../store/wishlistSlice";
import { addItem } from "../../store/cartSliceReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { FaTrash, FaShoppingCart, FaHeart, FaArrowLeft, FaShoppingBag, FaRegHeart } from "react-icons/fa";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(false);
  const [wishlistFetched, setWishlistFetched] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch wishlist from backend only once when component mounts or user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && !wishlistFetched) {
        setLoading(true);
        try {
          console.log("Fetching wishlist from backend...");
          const response = await api.get(`/users/${user._id}/wishlist`);
          console.log("Wishlist data from backend:", response.data);
          
          // The backend returns populated product data directly
          const transformedWishlist = response.data.map(item => ({
            _id: item._id,
            id: item._id,
            name: item.name || "Product",
            pic: item.pic || "/default-image.jpg",
            amt: item.price || item.amt || "0",
            category: item.category || "General",
            description: item.description || "",
            rating: item.rating || 0,
            stock: item.stock || 0
          }));
          
          // Dispatch to update Redux store
          dispatch(setWishlist(transformedWishlist));
          setWishlistFetched(true);
          
        } catch (error) {
          console.error("Error fetching wishlist:", error);
          toast.error("Failed to load wishlist");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishlist();
  }, [user, wishlistFetched, dispatch]);

  // If no user, show local storage wishlist directly
  useEffect(() => {
    if (!user && !wishlistFetched) {
      setWishlistFetched(true);
    }
  }, [user, wishlistFetched]);

  const removeWishlistItem = async (product) => {
    dispatch(removewishlist(product));
    
    // Also remove from backend if user is logged in
    if (user) {
      try {
        await api.delete(`/users/${user._id}/wishlist/${product._id}`);
      } catch (error) {
        console.error("Error removing from backend wishlist:", error);
        toast.error("Failed to remove from wishlist");
      }
    }
    
    toast.info("Removed from Wishlist");
  };

  const addToCartFromWishlist = (product) => {
    if (product.stock > 0) {
      dispatch(addItem({ ...product, quantity: 1 }));
      toast.success("Added to cart!");
    } else {
      toast.error("Product is out of stock");
    }
  };

  const handleContinueShopping = () => {
    window.history.back();
  };

  const moveAllToCart = () => {
    const availableProducts = wishlistProducts.filter(product => product.stock > 0);
    
    if (availableProducts.length === 0) {
      toast.error("No products available in stock");
      return;
    }

    availableProducts.forEach(product => {
      dispatch(addItem({ ...product, quantity: 1 }));
    });
    
    toast.success(`Added ${availableProducts.length} items to cart!`);
    
    if (availableProducts.length < wishlistProducts.length) {
      toast.info(`${wishlistProducts.length - availableProducts.length} items are out of stock`);
    }
  };

  return (
    <div className="wishlist-page-wrapper">
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb wishlist-breadcrumb">
            <li className="breadcrumb-item">
              <button 
                className="btn btn-link wishlist-back-btn p-0" 
                onClick={handleContinueShopping}
              >
                <FaArrowLeft className="me-2" />
                Back to Shopping
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Wishlist
            </li>
          </ol>
        </nav>

        <div className="wishlist-main-section">
          <div className="wishlist-header-section d-flex justify-content-between align-items-center mb-4">
            <h1 className="wishlist-main-title mb-0">
              <FaHeart className="me-3" />
              My Wishlist
            </h1>
            {wishlistProducts.length > 0 && (
              <div className="d-flex align-items-center gap-3">
                <span className="wishlist-badge-count">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
                </span>
                <button 
                  className="btn wishlist-move-all-btn"
                  onClick={moveAllToCart}
                >
                  <FaShoppingCart className="me-2" />
                  Move All to Cart
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border wishlist-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 wishlist-loading-text">Loading your wishlist...</p>
            </div>
          ) : wishlistProducts.length > 0 ? (
            <div className="row g-4">
              {wishlistProducts.map((product) => (
                <div key={product._id || product.id} className="col-lg-6 col-xl-4">
                  <div className="wishlist-item-card">
                    <div className="wishlist-item-img-container">
                      <img 
                        src={product.pic} 
                        alt={product.name}
                        className="wishlist-item-img"
                        onError={(e) => {
                          e.target.src = "/default-image.jpg";
                        }}
                      />
                      <button
                        className="btn wishlist-remove-btn"
                        onClick={() => removeWishlistItem(product)}
                        title="Remove from wishlist"
                      >
                        <FaTrash />
                      </button>
                      {product.stock === 0 && (
                        <div className="wishlist-out-of-stock-badge">
                          Out of Stock
                        </div>
                      )}
                      <div className="wishlist-item-overlay">
                        <button
                          className="btn wishlist-add-cart-btn"
                          onClick={() => addToCartFromWishlist(product)}
                          disabled={product.stock === 0}
                        >
                          <FaShoppingCart className="me-2" />
                          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>

                    <div className="wishlist-item-details">
                      <h5 className="wishlist-product-title">{product.name}</h5>
                      <p className="wishlist-product-category text-muted mb-2">
                        {product.category || "General"}
                      </p>
                      <p className="wishlist-product-description">
                        {product.description ? 
                          (product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          ) 
                          : "No description available"
                        }
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="wishlist-product-price mb-0">
                          ₹ {product.amt}
                        </p>
                        {product.rating > 0 && (
                          <div className="wishlist-product-rating">
                            <FaHeart className="text-danger me-1" />
                            <small>{product.rating}</small>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="wishlist-item-actions">
                      <button
                        className="btn wishlist-quick-add-btn w-100"
                        onClick={() => addToCartFromWishlist(product)}
                        disabled={product.stock === 0}
                      >
                        <FaShoppingCart className="me-2" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wishlist-empty-state text-center py-5">
              <div className="wishlist-empty-icon mb-4">
                <FaRegHeart size={64} />
              </div>
              <h3 className="wishlist-empty-title mb-3">Your Wishlist is Empty</h3>
              <p className="wishlist-empty-text text-muted mb-4">
                {user ? "You haven't added any items to your wishlist yet." : "Save your favorite items here for later!"}
              </p>
              <button 
                className="btn wishlist-continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};