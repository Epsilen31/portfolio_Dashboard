// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationSlice from "./slices/softwareApplicationSlice";
import skillSlice from "./slices/skillSlice";
import projectSlice from "./slices/projectSlice";

// Configure store with persisted reducers
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationSlice,
    skills: skillSlice,
    projects: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
