import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});

export default store;
