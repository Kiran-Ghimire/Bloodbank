import React from "react";

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
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
}

export default App;
