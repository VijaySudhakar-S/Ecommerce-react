import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Headers/Header";
import { Cart } from "./Components/Cart/Cart";
import { PageNotFound } from "./Components/pageNotFound/PageNotFound";
import { Wishlist } from "./Components/Wishlist/Wishlist";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import ToastMessage from "./UiComponents/ToastMessage.jsx";

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
