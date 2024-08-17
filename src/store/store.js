// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default to localStorage
import userReducer from "./slices/userSlice";
import forgotReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationSlice from "./slices/softwareApplicationSlice";
import skillSlice from "./slices/skillSlice";
import projectSlice from "./slices/projectSlice";

// Redux persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure store with persisted reducers
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
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

// Create and export the persistor
export const persistor = persistStore(store);
