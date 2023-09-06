import { createSlice } from "@reduxjs/toolkit";

/*
value holds all necessary info for authentication
{
  accessToken,
  email,
  userId,
}
*/

export const authenticationStateSlice = createSlice({
  name: "authenticationState",
  initialState: {
    value: {},
  },
  reducers: {
    setAuthenticationState: (state, action) => {
      state.value = action.payload; //eslint-disable-line
    },
  },
});

export const { setAuthenticationState } = authenticationStateSlice.actions;

export default authenticationStateSlice.reducer;