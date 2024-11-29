import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});

export default store;
