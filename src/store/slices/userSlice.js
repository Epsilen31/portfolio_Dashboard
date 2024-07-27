// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    loginRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = {};
    },
    // eslint-disable-next-line no-unused-vars
    loadUserRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isAuthenticated = false;
      state.user = {};
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      // eslint-disable-next-line no-self-assign
      state.isAuthenticated = state.isAuthenticated;
      state.user = {};
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.message = null;
    },

    updateProfileRequest(state) {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
      state.message = null;
    },
    updateProfileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  clearAllError,
  loadUserFailed,
  loadUserSuccess,
  loadUserRequest,
  logoutSuccess,
  logoutFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  updateProfileResetAfterUpdate,
} = userSlice.actions;

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(loadUserSuccess(data.user));
      dispatch(clearAllError());
    } catch (error) {
      dispatch(
        loadUserFailed(error.response?.data?.message || "An error occurred")
      );
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/user/getuser",
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(data.user));
    dispatch(clearAllError());
  } catch (error) {
    dispatch(loginFailed(error.response?.data?.message || "An error occurred"));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(logoutSuccess(data.message));
    dispatch(clearAllError());
  } catch (error) {
    dispatch(
      logoutFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    // Implement update password logic here
    dispatch(updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/user/update/password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(updatePasswordSuccess(data.message));
      dispatch(clearAllError());
    } catch (error) {
      dispatch(
        updatePasswordFailed(
          error.response?.data?.message || "An error occurred"
        )
      );
    }
  };

export const updateProfile = (newData) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const data = await axios.put(
      "http://localhost:8000/api/v1/user/update/profile",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSuccess(data.data.message));
    dispatch(clearAllError());
  } catch (error) {
    dispatch(
      updateProfileFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const resetProfile = () => async (dispatch) => {
  // Implement reset profile logic here
  dispatch(updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearAllError());
};

export default userSlice.reducer;
