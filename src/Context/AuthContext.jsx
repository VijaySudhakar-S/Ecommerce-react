import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register
  const registerUser = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      return { success: true, ...res.data };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Login
  const loginUser = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      toast.success("Login successful");
      return { success: true };
    } catch (err) {
      const errorData = err.response?.data;
      const msg = errorData?.message || "Invalid email or password";
      toast.error(msg);
      
      if (errorData?.needsVerification) {
        return { success: false, needsVerification: true, email: errorData.email };
      }

      return { success: false, message: msg };
    }
  };

  // OTP verification
  const verifyOTP = async (otpData) => {
    try {
      const res = await api.post("/auth/verify-otp", otpData);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      toast.success(res.data.message);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Eesending the OTP.
  const resendOTP = async (emailData) => {
    try {
      const res = await api.post("/auth/resend-otp", emailData);
      toast.success(res.data.message); 
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Profile
  const getProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      return res.data;
    } catch (error) {
      console.error("Failed to fetch profile", error);
      toast.error("Could not fetch profile data.");
      return null;
    }
  };


  // Logout
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        verifyOTP,
        resendOTP, 
        getProfile,
        logoutUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);