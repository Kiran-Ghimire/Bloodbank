import React from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verify from "./components/auth/Verify";
// import "./app.scss";
import { useParams } from "react-router";
import Contact from "./components/bloodbank";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/auth/forgetPassword";
import SetPassword from "./components/auth/setPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/verify" exact element={<Verify />} />
        <Route path="/forgetPassword" exact element={<ForgetPassword />} />
        <Route path="/setPassword" exact element={<SetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
