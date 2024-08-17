import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  skills: [],
  error: null,
  message: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    getAllSkillsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    getAllSkillsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
    },
    addNewSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
    },
    deleteSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetSkillSlices(state) {
      state.error = null;
      state.skills = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  getAllSkillsRequest,
  getAllSkillsSuccess,
  getAllSkillsFailed,
  addNewSkillRequest,
  addNewSkillSuccess,
  addNewSkillFailed,
  deleteSkillRequest,
  deleteSkillSuccess,
  deleteSkillFailed,
  updateSkillRequest,
  updateSkillSuccess,
  updateSkillFailed,
  resetSkillSlices,
  clearAllErrors,
} = skillSlice.actions;

export const getAllSkills = () => async (dispatch) => {
  dispatch(getAllSkillsRequest());
  try {
    const response = await axios.get(
      "https://portfolio-backend-b5dh.onrender.com/api/v1/skills/getAllSkills",
      { withCredentials: true }
    );
    dispatch(getAllSkillsSuccess(response.data));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      getAllSkillsFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

// In your action creator
export const addNewSkill = (data) => async (dispatch) => {
  dispatch(addNewSkillRequest());
  try {
    const response = await axios.post(
      "https://portfolio-backend-b5dh.onrender.com/api/v1/skills/addSkill",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Success Response:", response.data);
    dispatch(addNewSkillSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    console.log(
      "Error Response:",
      error.response?.data?.message || error.message
    );
    dispatch(
      addNewSkillFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(deleteSkillRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-b5dh.onrender.com/api/v1/skills/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(deleteSkillSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      deleteSkillFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const updateSkill =
  ({ id, proficiency }) =>
  async (dispatch) => {
    dispatch(updateSkillRequest());
    try {
      const response = await axios.put(
        `https://portfolio-backend-b5dh.onrender.com/api/v1/skills/update/${id}`,
        { proficiency },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success Response:", response);
      dispatch(updateSkillSuccess(response.data.message));
      dispatch(clearAllErrors());
    } catch (error) {
      dispatch(
        updateSkillFailed(error.response?.data?.message || "An error occurred")
      );
    }
  };

export const resetSkillState = () => (dispatch) => {
  dispatch(resetSkillSlices());
};

export const clearSkillErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default skillSlice.reducer;
