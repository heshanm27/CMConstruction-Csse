import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    curruntUser: null,
    isLoggedIn: false,
  },
  reducers: {
    setCurruentUser: (state, action) => {
      if (action.payload) {
        state.curruntUser = action.payload;
        state.isLoggedIn = true;
      }
    },
    unsetCurruntUser: (state, action) => {
      state.curruntUser = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const { setCurruentUser, unsetCurruntUser } = userSlice.actions;
export default userSlice.reducer;
