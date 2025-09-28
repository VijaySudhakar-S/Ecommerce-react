import React, { useEffect, useState } from "react";
import "./Cart.css";
import { removeItem, updateQuantity, setCart } from "../../store/cartSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck, FaArrowLeft } from "react-icons/fa";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartFetched, setCartFetched] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Calculate shipping
  const shippingCost = total >= 499 ? 0 : Math.floor(Math.random() * 31) + 30; // 30-60 if under 499
  const finalTotal = total + shippingCost;

  // Fetch cart from backend only once when component mounts or user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user && !cartFetched) {
        setLoading(true);
        try {
          const response = await api.get(`/users/${user._id}/cart`);
          
          const transformedCart = response.data.map(item => ({
            _id: item.productId?._id || item.productId,
            id: item.productId?._id || item.productId,
            name: item.productId?.name || "Product",
            pic: item.productId?.pic || "/default-image.jpg",
            amt: item.productId?.price || item.productId?.amt || "0",
            quantity: item.quantity || 1,
            category: item.productId?.category || "General"
          }));
          
          dispatch(setCart(transformedCart));
          setCartFetched(true);
          
        } catch (error) {
          console.error("Error fetching cart:", error);
          toast.error("Failed to load cart");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [user, cartFetched, dispatch]);

  // Calculate total whenever cartProducts change
  useEffect(() => {
    if (cartProducts.length > 0) {
      const calculatedTotal = cartProducts.reduce(
        (pre, curr) => pre + (parseInt(curr.amt) || 0) * (curr.quantity || 1),
        0
      );
      setTotal(calculatedTotal);
    } else {
      setTotal(0);
    }
  }, [cartProducts]);

  const removeCartItem = (product) => {
    dispatch(removeItem(product));
    toast.info("Removed from Cart");
  };

  const updateCartQuantity = (product, newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateQuantity({ 
      id: product._id || product.id, 
      quantity: newQuantity 
    }));
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    toast.success("Proceeding to checkout...");
    // Add your checkout logic here
  };

  const handleContinueShopping = () => {
    window.history.back();
  };

  // If no user, show local storage cart directly
  useEffect(() => {
    if (!user && !cartFetched) {
      setCartFetched(true);
    }
  }, [user, cartFetched]);

  return (
    <div className="cart-page-wrapper">
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb cart-breadcrumb">
            <li className="breadcrumb-item">
              <button 
                className="btn btn-link cart-back-btn p-0" 
                onClick={handleContinueShopping}
              >
                <FaArrowLeft className="me-2" />
                Back to Shopping
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            <div className="cart-main-section">
              <div className="cart-header-section d-flex justify-content-between align-items-center mb-4">
                <h1 className="cart-main-title mb-0">
                  <FaShoppingBag className="me-3" />
                  Your Shopping Cart
                </h1>
                {cartProducts.length > 0 && (
                  <span className="cart-badge-count">
                    {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border cart-spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 cart-loading-text">Loading your cart...</p>
                </div>
              ) : cartProducts.length > 0 ? (
                <div className="cart-items-container">
                  {cartProducts.map((product) => (
                    <div key={product._id || product.id} className="cart-item-card">
                      <div className="row g-3 align-items-center">
                        {/* Product Image */}
                        <div className="col-md-2 col-3">
                          <div className="cart-item-img-container">
                            <img 
                              src={product.pic} 
                              alt={product.name}
                              className="cart-item-img"
                              onError={(e) => {
                                e.target.src = "/default-image.jpg";
                              }}
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="col-md-4 col-9">
                          <div className="cart-item-details">
                            <h5 className="cart-product-title">{product.name}</h5>
                            <p className="cart-product-category text-muted mb-2">
                              {product.category || "General"}
                            </p>
                            <p className="cart-product-price mb-0">
                              ₹ {product.amt}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-md-3 col-6">
                          <div className="cart-quantity-section">
                            <label className="form-label cart-quantity-label">Quantity:</label>
                            <div className="cart-quantity-controls">
                              <button
                                className="btn cart-quantity-btn"
                                onClick={() => updateCartQuantity(product, (product.quantity || 1) - 1)}
                                disabled={(product.quantity || 1) <= 1}
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="cart-quantity-display">
                                {product.quantity || 1}
                              </span>
                              <button
                                className="btn cart-quantity-btn"
                                onClick={() => updateCartQuantity(product, (product.quantity || 1) + 1)}
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-md-2 col-4">
                          <div className="cart-item-subtotal text-center">
                            <h6 className="cart-subtotal-label">Subtotal</h6>
                            <p className="cart-subtotal-amount mb-0">
                              ₹ {(parseInt(product.amt) || 0) * (product.quantity || 1)}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="col-md-1 col-2">
                          <div className="text-end">
                            <button
                              className="btn cart-remove-btn"
                              onClick={() => removeCartItem(product)}
                              title="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cart-empty-state text-center py-5 ">
                  <div className="cart-empty-icon mb-4">
                    <FaShoppingBag size={64} />
                  </div>
                  <h3 className="cart-empty-title mb-3">Your Cart is Empty</h3>
                  <p className="cart-empty-text text-muted mb-4">
                    {user ? "You haven't added any items to your cart yet." : "Add items to your cart to see them here."}
                  </p>
                  <button 
                    className="btn cart-continue-shopping-btn text-white fw-bold"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          {cartProducts.length > 0 && (
            <div className="col-lg-4">
              <div className="cart-summary-section">
                <div className="cart-summary-card">
                  <h3 className="cart-summary-title">Order Summary</h3>
                  
                  <div className="cart-summary-items">
                    <div className="cart-summary-row d-flex justify-content-between mb-3">
                      <span className="cart-summary-label">Subtotal ({cartProducts.length} items)</span>
                      <span className="cart-summary-value">₹ {total}</span>
                    </div>

                    <div className="cart-summary-row d-flex justify-content-between mb-3">
                      <span className="cart-summary-label">
                        <FaTruck className="me-2" />
                        Shipping
                      </span>
                      <span className={`cart-summary-value ${shippingCost === 0 ? 'text-success' : ''}`}>
                        {shippingCost === 0 ? 'FREE' : `₹ ${shippingCost}`}
                      </span>
                    </div>

                    {total < 499 && (
                      <div className="cart-shipping-notice alert alert-info py-2">
                        <small>
                          Add ₹ {499 - total} more for <strong>FREE shipping</strong>
                        </small>
                      </div>
                    )}

                    <hr className="cart-summary-divider" />

                    <div className="cart-total-row d-flex justify-content-between align-items-center">
                      <strong className="cart-total-label">Total Amount</strong>
                      <strong className="cart-total-amount">₹ {finalTotal}</strong>
                    </div>
                  </div>

                  <button
                    className="btn cart-checkout-btn w-100 mt-4"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>

                  {!user && (
                    <div className="cart-guest-notice text-center mt-3">
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        Sign in to sync your cart across devices
                      </small>
                    </div>
                  )}

                  <div className="cart-security-notice text-center mt-3">
                    <small className="text-muted">
                      <i className="fas fa-lock me-1"></i>
                      Secure checkout guaranteed
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};