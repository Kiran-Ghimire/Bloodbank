import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";

import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
