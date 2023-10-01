import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  tokenId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.tokenId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
