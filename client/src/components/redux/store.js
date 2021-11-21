import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    authUser: userDetailReducer,
  },
});
