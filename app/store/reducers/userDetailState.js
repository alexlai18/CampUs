import { createSlice } from "@reduxjs/toolkit";

/*
value holds all the details of a user
{
  details
}
*/

export const userDetailStateSlice = createSlice({
  name: "userDetailState",
  initialState: {
    value: {},
  },
  reducers: {
    setUserDetailState: (state, action) => {
      state.value = action.payload; //eslint-disable-line
    },
  },
});

export const { setUserDetailState } = userDetailStateSlice.actions;

export default userDetailStateSlice.reducer;