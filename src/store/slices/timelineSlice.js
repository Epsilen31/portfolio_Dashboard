import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetTimelineSlice(state) {
      state.error = null;
      state.timeline = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

const {
  getAllTimelineRequest,
  getAllTimelineSuccess,
  getAllTimelineFailed,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  deleteTimelineFailed,
  addTimelineRequest,
  addTimelineSuccess,
  addTimelineFailed,
  clearAllErrors,
  resetTimelineSlice,
} = timelineSlice.actions;

// Action creators
export const getAllTimeline = () => async (dispatch) => {
  dispatch(getAllTimelineRequest());
  try {
    const response = await axios.get(
      "https://portfolio-backend-b5dh.onrender.com/api/v1/timeline/getAll",
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(getAllTimelineSuccess(response.data));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      getAllTimelineFailed(
        error.response?.data?.message || "Failed to fetch timeline"
      )
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(deleteTimelineRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-b5dh.onrender.com/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(deleteTimelineSuccess(response.data.message));
  } catch (error) {
    dispatch(
      deleteTimelineFailed(
        error.response?.data?.message || "Failed to delete timeline"
      )
    );
  }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(addTimelineRequest());
  try {
    const response = await axios.post(
      `https://portfolio-backend-b5dh.onrender.com/api/v1/timeline/add`,
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(addTimelineSuccess(response.data.message));
  } catch (error) {
    dispatch(
      addTimelineFailed(
        error.response?.data?.message || "Failed to add timeline"
      )
    );
  }
};

// Error handling action creators
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};
export const resetTimeline = () => (dispatch) => {
  dispatch(resetTimelineSlice());
};

// Default export for the reducer
export default timelineSlice.reducer;
