import React from "react";

// import "./app.scss";
// import { Redirect } from "react-router";

import {
  BrowserRouter,
  Navigate,
  Link,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

import UserRoutes from "./Routes/UserRoutes";

function App() {
  // const auth = useSelector((state) => state.authUser.auth);
  // console.log("authy", auth);
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
}

export default App;
