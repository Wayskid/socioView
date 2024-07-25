import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import appReducer from "./features/appSlice";
import { appApi } from "../services/appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { cloudinaryApi } from "../services/cloudinaryApi";
import { socioViewNewsApi } from "../services/socioViewNewsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  [appApi.reducerPath]: appApi.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
  [socioViewNewsApi.reducerPath]: socioViewNewsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      appApi.middleware,
      cloudinaryApi.middleware,
      socioViewNewsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
