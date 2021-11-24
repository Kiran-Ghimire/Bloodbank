import ForgetPassword from "../components/auth/forgetPassword";
import SetPassword from "../components/auth/setPassword";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Verify from "../components/auth/Verify";
import Bloodbank from "../components/bloodbank";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export default function UserRoutes() {
  const token = useSelector((state) => state.authUser.token);

  return (
    <Switch>
      {/* <Route
        exact
        path="*"
        element={<ProtectedRoute isAuth={token} component={<Bloodbank />} />}
      ></Route> */}
      {/* <Route exact path="/" element={<Bloodbank />} /> */}

      {/* <ProtectedRoute isAuth={token} component={<Bloodbank />} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/verify" component={Verify} />
      <Route exact path="/forgetPassword" component={ForgetPassword} />
      <Route exact path="/setPassword" component={SetPassword} />
      <ProtectedRoute path="/" isAuth={token} component={Bloodbank} />
    </Switch>
  );
}
