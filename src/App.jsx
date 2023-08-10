import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import StudentHome from "./components/Student/Home";
import StudentLogin from "./components/Student/Login";
import StudentRegister from "./components/Student/Register";
import StaffHome from "./components/Staff/Home";
import StaffLogin from "./components/Staff/Login";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="student">
          <Route path="dashboard" element={<StudentHome />} />
          <Route path="login" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
        </Route>
        <Route path="staff">
          <Route path="dashboard" element={<StaffHome />} />
          <Route path="login" element={<StaffLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
