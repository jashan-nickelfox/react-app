import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "./cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="item-controls">
                <button onClick={() => dispatch(updateQuantity({ id: item.id, change: -1 }))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item.id, change: 1 }))}>+</button>
                <button
                  className="remove-button"
                  onClick={() => dispatch(removeItem({ id: item.id }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
}
