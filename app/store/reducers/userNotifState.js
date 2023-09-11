import { createSlice } from "@reduxjs/toolkit";

/*
value holds all the details of a user
{
  notifId: info
}
*/

export const userNotifStateSlice = createSlice({
  name: "userNotifState",
  initialState: {
    value: []
  },
  reducers: {
    setUserNotifState: (state, action) => {
      state.value = action.payload; //eslint-disable-line
    },

    addUserNotif: (state, action) => {
      const { key, value } = action.payload
      const index = state.value.findIndex(item => item.key === key);

      if (index !== -1) {
        // If the key exists, update the value at that index
        state.value[index].value = value;
      } else {
        // If the key doesn't exist, add a new key-value pair
        state.value.push({ key, value });
      }
    },
  }
})

export const { setUserNotifState, addUserNotif } = userNotifStateSlice.actions;

export default userNotifStateSlice.reducer;