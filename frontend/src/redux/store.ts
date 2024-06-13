"use client";

import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading"
import meDataReducer from "./slices/meData";
export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    meData: meDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
