import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginform from "./Loginform";
import Cart from "./Cart";
import './App.css';
import './Cart.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
