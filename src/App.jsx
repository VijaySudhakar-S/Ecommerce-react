import { createContext, useState } from "react";
import "./App.css";
import "./Components/Headers/Header.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Headers/Header";
import { Cart } from "./Components/cart/cart";

export const cartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Header cart={cart} />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

export default App;
