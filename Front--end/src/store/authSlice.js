// import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   mobileNo: "",
//   address: "",
//   companyName: "",
//   website: "",
//   goal: "",
//   isAuthenticated: false,
//   step1Complete: false, // NEW STATE
//   error: {},
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     updateField: (state, action) => {
//       const { name, value } = action.payload;
//       state[name] = value.trim();
//       state.error[name] = !value.trim() ? `Enter ${name.replace(/([A-Z])/g, " $1")}` : "";

//       if (name === "password" && value.length < 6) {
//         state.error.password = "Password must be at least 6 characters";
//       }

//       if (name === "confirmPassword") {
//         state.error.confirmPassword = value !== state.password ? "Passwords do not match" : "";
//       }
//     },

//     validateForm: (state, action) => {
//       const { formType } = action.payload;
//       const errors = {};

//       if (formType === "user") {
//         if (!state.firstName) errors.firstName = "Enter first name";
//         if (!state.lastName) errors.lastName = "Enter last name";
//         if (!state.email) errors.email = "Enter email";
//         if (!state.password) errors.password = "Enter password (min 6 chars)";
//         if (!state.confirmPassword) errors.confirmPassword = "Confirm your password";
//         if (state.confirmPassword !== state.password) errors.confirmPassword = "Passwords do not match";
//         if (!state.mobileNo) errors.mobileNo = "Enter contact number";
//         if (!state.address) errors.address = "Enter address";
//       } else if (formType === "company") {

//         if (!state.companyName) errors.companyName = "Enter Company Name";
//         if (!state.website) errors.website = "Enter Website Domain";
//         if (!state.goal) errors.goal = "Select a Goal";
//       }

//       state.error = errors;

//       if (Object.keys(errors).length === 0) {
//         if (formType === "user") {
//           state.step1Complete = true; // Move to Step 2
//         } else {
//           state.isAuthenticated = true;
//         }
//       }
//     },

//     logout: () => initialState,
//   },
// });

// export const authActions = authSlice.actions;
// export default authSlice.reducer;





import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNo: "",
  address: "",
  companyName: "",
  website: "",
  goal: "",
  isAuthenticated: false,
  step1Complete: false, 
  error: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupUpdate: (state, action) => {
      const { name, value } = action.payload;
      state[name] = name === "lastName" ? value : value.trim();
      state.error[name] = !value.trim() ? `Enter ${name.replace(/([A-Z])/g, " $1")}` : "";

      if (name === "password" && value.length < 6) {
        state.error.password = "Password must be at least 6 characters";
      }

      if (name === "confirmPassword") {
        state.error.confirmPassword = value !== state.password ? "Passwords do not match" : "";
      }
    },

    signupValidate: (state, action) => {
      const { formType } = action.payload;
      const errors = {};

      if (formType === "user") {
        if (!state.firstName) errors.firstName = "Enter first name";
        // if (!state.lastName) errors.lastName = "Enter last name";
        if (!state.email) errors.email = "Enter email";
        if (!state.password) errors.password = "Enter password (min 6 chars)";
        if (!state.confirmPassword) errors.confirmPassword = "Confirm your password";
        if (state.confirmPassword !== state.password) errors.confirmPassword = "Passwords do not match";
        if (!state.mobileNo) errors.mobileNo = "Enter contact number";
        if (!state.address) errors.address = "Enter address";
      } else if (formType === "company") {
        if (!state.companyName) errors.companyName = "Enter Company Name";
        if (!state.website) errors.website = "Enter Website Domain";
        if (!state.goal) errors.goal = "Select a Goal";
      }

      state.error = errors;

      if (Object.keys(errors).length === 0) {
        if (formType === "user") {
          state.step1Complete = true; // Move to Step 2
        } else {
          state.isAuthenticated = true;
        }
      }
    },

    logout: () => initialState,
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
