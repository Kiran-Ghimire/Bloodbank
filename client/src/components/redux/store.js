import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userDetailReducer from "./authSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

// const persistConfig = {
//   key: "root",
//   storage,
//   // blacklist: ["booking"],
// };

// const persistedReducer = persistReducer(persistConfig, authUser);

// export const store = configureStore({
//   reducer: {
//     authUser: userDetailReducer,
//   },
//   middleware: [thunk, logger],
// });
const persistConfig = {
  timeout: 0,
  key: "root",
  storage,
};

// const combineReducer = {authUser: userDetailReducer}

const appReducer = combineReducers({
  authUser: userDetailReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  //getDefaultMiddleware shows error when it sees non-serilaize object
  devTools: true, //default
});

// sagaMiddleware.run(watcherSaga);
export const persistor = persistStore(store);
