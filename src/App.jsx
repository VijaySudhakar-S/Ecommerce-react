import "./App.css";
import "./Components/Headers/Header.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Headers/Header";
import { Cart } from "./Components/cart/Cart";
import { PageNotFound } from "./Components/pageNotFound/pageNotFound";
import { Wishlist } from "./Components/wishlist/wishlist";



function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="*"  element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
