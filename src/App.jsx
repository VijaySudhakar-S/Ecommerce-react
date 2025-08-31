import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Components/Home/Home.jsx";
import { Header } from "./Components/Headers/Header.jsx";
import { Cart } from "./Components/cart/Cart.jsx";
import { PageNotFound } from "./Components/pageNotFound/PageNotFound.jsx";
import { Wishlist } from "./Components/wishlist/Wishlist.jsx";
import { ProductDetail } from "./Components/ProductDetail/ProductDetail.jsx";
import Login from "./Components/Auth/Login.jsx";
import Register from "./Components/Auth/Register.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import ToastMessage from "./UiComponents/ToastMessage.jsx";
import VerifyOTP from "./Components/Auth/VerifyOTP.jsx";

function Layout() {
  const location = useLocation();

  // List of paths where Header should be hidden
  const hideHeaderRoutes = ["/login", "/register", "/verify-otp"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/profile"element={ <ProtectedRoute> <Profile /></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastMessage />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;