import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginform from "./components/Loginform";
import Cart from "./components/Cart";
import Gallery from './components/Gallery';
import './App.css';
import './features/cart/Cart.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
