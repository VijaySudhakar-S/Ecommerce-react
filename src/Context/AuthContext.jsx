import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

// ✅ Register with toast
const registerUser = async (formData) => {
  try {
    const res = await api.post("/auth/register", formData);

    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    toast.success("Registered successfully");
    return res.data;
  } catch (err) {
    const msg = err.response?.data?.message || "Registration failed";
    toast.error(`${msg}`);
    return null;
  }
};

// ✅ Login with toast
const loginUser = async (formData) => {
  try {
    const res = await api.post("/auth/login", formData);

    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    toast.success("Login successful");
    return res.data;
  } catch (err) {
    const msg = err.response?.data?.message || "Invalid email or password";
    toast.error(`${msg}`);
    return null; 
  }
};


  // ✅ Logout with toast
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
