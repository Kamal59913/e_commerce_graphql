"use client";

import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  initialState: false,
  name: "loading",
  reducers: {
    isLoading(state, action) {
      state = action.payload;
      return state;
    },
   
  },
});

export const {
  isLoading
} = loadingSlice.actions;
export default loadingSlice.reducer;
