import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Ensure authSlice.js exists

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
