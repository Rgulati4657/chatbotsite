
// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  currentUser: null,
  error: {},
  isAuthenticated: false,

  // forgot password
  emailForReset: "",
  otpVerified: false,
  forgotError: null,
  forgotSuccessMessage: null,
  step: "email", // ✅ Step added
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // ... other reducers ...
    
    setStep(state, action) {
      state.step = action.payload;
    },

    setResetEmail(state, action) {
      state.emailForReset = action.payload;
      state.forgotError = null;
      state.forgotSuccessMessage = "OTP sent successfully!";
    },

    setOTPVerified(state, action) {
      state.otpVerified = action.payload;
      if (action.payload) {
        state.forgotSuccessMessage = "OTP verified successfully! You can now reset your password.";
      }
    },

    setForgotError(state, action) {
      state.forgotError = action.payload;
      state.forgotSuccessMessage = null;
    },

    clearForgotPasswordState(state) {
      state.emailForReset = "";
      state.otpVerified = false;
      state.forgotError = null;
      state.forgotSuccessMessage = null;
      state.step = "email"; // reset step
    },
  },
});


export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
