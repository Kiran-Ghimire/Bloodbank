import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

export default function ProtectedRoute(props) {
  //   const auth = useSelector((state) => state.authUser.auth);
  //   console.log("authy", auth);

  const { isAuth: isAuth, component: Component, ...rest } = props;
  return (
    <Switch>
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
              // state to know from whereever you called this route
            );
          }
        }}
      />
    </Switch>
  );
}
