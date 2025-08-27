import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/Home/Home.jsx";
import { Header } from "./components/Headers/Header.jsx";
import { Cart } from "./components/Cart/Cart.jsx";
import { PageNotFound } from "./components/pageNotFound/PageNotFound.jsx";
import { Wishlist } from "./components/Wishlist/Wishlist.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ToastMessage from "./uiComponents/ToastMessage.jsx";

function Layout() {
  const location = useLocation();

  // List of paths where Header should be hidden
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
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
