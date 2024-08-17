import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  softwareApplications: [],
  error: null,
  message: null,
};

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState,
  reducers: {
    getAllSoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewSoftwareApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareApplicationSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
    },
    addNewSoftwareApplicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSoftwareApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
    },
    deleteSoftwareApplicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetSoftwareApplicationSlices(state) {
      state.error = null;
      // eslint-disable-next-line no-self-assign
      state.softwareApplications = state.softwareApplications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      // eslint-disable-next-line no-self-assign
      state.softwareApplications = state.softwareApplications;
    },
  },
});

export const {
  getAllSoftwareApplicationsRequest,
  getAllSoftwareApplicationsSuccess,
  getAllSoftwareApplicationsFailed,
  addNewSoftwareApplicationRequest,
  addNewSoftwareApplicationSuccess,
  addNewSoftwareApplicationFailed,
  deleteSoftwareApplicationRequest,
  deleteSoftwareApplicationSuccess,
  deleteSoftwareApplicationFailed,
  resetSoftwareApplicationSlices,
  clearAllErrors,
} = softwareApplicationSlice.actions;

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(getAllSoftwareApplicationsRequest());
  try {
    const response = await axios.get(
      "https://portfolio-backend-b5dh.onrender.com/api/v1/softwareApplication/getAll",
      { withCredentials: true }
    );
    console.log("data", response.data),
      dispatch(getAllSoftwareApplicationsSuccess(response.data));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      getAllSoftwareApplicationsFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(addNewSoftwareApplicationRequest());
  try {
    const response = await axios.post(
      "https://portfolio-backend-b5dh.onrender.com/api/v1/softwareApplication/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(addNewSoftwareApplicationSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      addNewSoftwareApplicationFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(deleteSoftwareApplicationRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-b5dh.onrender.com/api/v1/softwareApplication/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(deleteSoftwareApplicationSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      deleteSoftwareApplicationFailed(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(resetSoftwareApplicationSlices());
};

export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default softwareApplicationSlice.reducer;
