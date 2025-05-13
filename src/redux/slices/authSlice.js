// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  balance: 0,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, email, balance } = action.payload;
      state.id = id;
      state.email = email;
      state.balance = balance;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.balance = 0;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
