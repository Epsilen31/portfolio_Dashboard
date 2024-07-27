// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationSlice from "./slices/softwareApplicationSlice";
import skillSlice from "./slices/skillSlice";
import projectSlice from "./slices/projectSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducers
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedForgotReducer = persistReducer(persistConfig, forgotReducer);
const persistedMessageReducer = persistReducer(persistConfig, messageReducer);
const persistedTimelineReducer = persistReducer(persistConfig, timelineReducer);
const persistedSoftwareApplicationReducer = persistReducer(
  persistConfig,
  softwareApplicationSlice
);
const persistedSkillReducer = persistReducer(persistConfig, skillSlice);
const persistedProjectReducer = persistReducer(persistConfig, projectSlice);

// Configure store with persisted reducers
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    forgotPassword: persistedForgotReducer,
    messages: persistedMessageReducer,
    timeline: persistedTimelineReducer,
    softwareApplications: persistedSoftwareApplicationReducer,
    skills: persistedSkillReducer,
    projects: persistedProjectReducer,
  },
});

// Create a persistor
export const persistor = persistStore(store);
