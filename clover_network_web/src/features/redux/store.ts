import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: [thunk],
});

export const persistStor = persistStore(store);

export default store;
