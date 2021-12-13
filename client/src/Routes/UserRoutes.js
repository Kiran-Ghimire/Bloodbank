import ForgetPassword from "../components/auth/forgetPassword";
import SetPassword from "../components/auth/setPassword";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Verify from "../components/auth/Verify";
import Bloodbank from "../components/bloodbank/index";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../components/bloodbank/editProfile";
import Profile from "../components/bloodbank/Profile";

import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Changepassword from "../components/bloodbank/changePassword";

export default function UserRoutes() {
  const auth = useSelector((state) => state.authUser.auth);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/verify" component={Verify} />
      <Route exact path="/forgetPassword" component={ForgetPassword} />
      <Route exact path="/setPassword" component={SetPassword} />
      <ProtectedRoute path="/profile" isAuth={auth} component={Profile} />
      <ProtectedRoute
        path="/editprofile"
        isAuth={auth}
        component={EditProfile}
      />
      <ProtectedRoute
        path="/changepassword"
        isAuth={auth}
        component={Changepassword}
      />
      <ProtectedRoute path="/" isAuth={auth} component={Bloodbank} />
    </Switch>
  );
}
