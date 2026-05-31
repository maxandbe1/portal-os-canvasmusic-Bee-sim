import React from "react";
import ReactDOM from "react-dom/client";
import { bootstrapPortal } from "./runtime/bootstrap.js";
import Shell from "./layout/Shell.jsx";
import "./styles/portal.css";

bootstrapPortal();

ReactDOM.createRoot(document.getElementById("root")).render(<Shell />);
