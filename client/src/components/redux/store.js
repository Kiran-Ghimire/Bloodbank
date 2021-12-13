import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userDetailReducer from "./authSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

const persistConfig = {
  timeout: 0,
  key: "root",
  storage,
};

const appReducer = combineReducers({
  authUser: userDetailReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],

  devTools: true,
});

export const persistor = persistStore(store);
