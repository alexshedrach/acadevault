import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  registrationMessage: null, // ← track signup prompt
  passwordMessage: null,
  ui: { sidebarOpen: false },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    // NEW: after signup, store the message to show on ActivatePromptPage
    setRegistrationMessage: (state, action) => {
      state.registrationMessage = action.payload;
    },
    // NEW: clear that message (e.g. on mount of the prompt page)
    clearRegistrationMessage: (state) => {
      state.registrationMessage = null;
    },

    setPasswordMessage: (state, action) => {
      state.passwordMessage = action.payload;
    },
    clearPasswordMessage: (state) => {
      state.passwordMessage = null;
    },

    toggleSidebar: (state) => {
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  setRegistrationMessage,
  clearRegistrationMessage,
  setPasswordMessage,
  clearPasswordMessage,
  toggleSidebar,
} = authSlice.actions;

export default authSlice.reducer;
