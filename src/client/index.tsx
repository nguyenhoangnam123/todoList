import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/TodoListReducer";
import "./style.css";

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(
  <>
    <App />
  </>,
  root as HTMLElement
);
