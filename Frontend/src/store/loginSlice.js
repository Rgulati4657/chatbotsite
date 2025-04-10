// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  error: {},
  isAuthenticated: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password } = action.payload;
      const username = email.split('@')[0] + Math.floor(Math.random() * 1000); 
      state.users.push({ email, username, password });
      state.error = {};
    },
    login: (state, action) => {
      const { usernameOrEmail, password } = action.payload;
      const foundUser = state.users.find(
        user =>
          (user.email === usernameOrEmail || user.username === usernameOrEmail) &&
          user.password === password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
        state.error = {};
      } else {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = {
          usernameOrEmail: 'Invalid email or username',
          password: 'Incorrect password',
        };
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
