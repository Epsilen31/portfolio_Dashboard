// src/slices/forgotResetPasswordSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllForgotPasswordError(state) {
      state.error = null;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  clearAllForgotPasswordError,
} = forgotResetPassSlice.actions;

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/user/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotPasswordSuccess(data.message));
    dispatch(clearAllForgotPasswordError());
  } catch (error) {
    if (error.response) {
      dispatch(forgotPasswordFailed(error.response.data.message));
    } else if (error.request) {
      dispatch(forgotPasswordFailed("Network Error"));
    } else {
      dispatch(forgotPasswordFailed("Server Error"));
    }
  }
};

export const resetPassword =
  ({ token, password, confirmPassword }) =>
  async (dispatch) => {
    dispatch(resetPasswordRequest());
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(resetPasswordSuccess(data.message));
      dispatch(clearAllForgotPasswordError());
    } catch (error) {
      if (error.response) {
        dispatch(resetPasswordFailed(error.response.data.message));
      } else if (error.request) {
        dispatch(resetPasswordFailed("Network Error"));
      } else {
        dispatch(resetPasswordFailed("Server Error"));
      }
    }
  };

export default forgotResetPassSlice.reducer; // Default export
