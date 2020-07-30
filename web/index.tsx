import React from "react";
import { render } from "react-dom";

import "antd/dist/antd.min.css";
import "@/web/assets/common.sass";

import App from "./App";
import ContextProvider from "./context";

render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
