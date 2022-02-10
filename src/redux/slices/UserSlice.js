import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
    },
    update: (state, action) => {
      state.currentUser = action.payload.user;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, update, logout } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
