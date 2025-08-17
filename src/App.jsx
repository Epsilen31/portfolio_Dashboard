import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import { useEffect } from "react";
import "./App.css";
import { getAllMessages } from "./store/slices/messagesSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllProjects } from "./store/slices/projectSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Always try to get user first
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    // Only call authenticated endpoints after user is authenticated
    if (isAuthenticated) {
      dispatch(getAllMessages());
      dispatch(getAllTimeline());
      dispatch(getAllSoftwareApplications());
      dispatch(getAllSkills());
      dispatch(getAllProjects());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" element={<ViewProject />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
