import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Spinner from "../../UiComponents/Spinner/Spinner";
import "./Auth.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the email from the navigation state, redirect if it's not there
  const email = location.state?.email;
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);


  // Timer for the "Resend OTP" button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    const result = await verifyOTP({ email, otp });
    setIsVerifying(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.message || "An error occurred.");
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setMessage("");
    setResendDisabled(true);
    setCountdown(60); 

    setIsVerifying(true);
    const result = await resendOTP({ email });
    setIsVerifying(false)

    if (result.success) {
      setMessage("A new OTP has been sent to your email.");
    } else {
      setError(result.message || "Failed to resend OTP.");
      setResendDisabled(false);
      setCountdown(0);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card animate-slide">
        <h3 className="auth-title">Verify Your Email</h3>
        <p className="text-center text-muted mb-4">
          An OTP has been sent to <strong>{email}</strong>.
        </p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
          <button type="submit" className="allItems-btn w-100" disabled={isVerifying}>
            {isVerifying ? <Spinner /> : "Verify Account"}
          </button>
        </form>

        <p className="auth-footer">
          Didn't receive the code?{" "}
          <button
            className="btn btn-link p-0"
            onClick={handleResendOTP}
            disabled={resendDisabled || isResending}
          >
            {isResending ? "Sending..." : resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;