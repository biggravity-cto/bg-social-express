import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Set initial theme based on user preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme
  ? JSON.parse(savedTheme)
  : prefersDark
    ? "dark"
    : "light";
document.documentElement.classList.add(initialTheme);
document.documentElement.setAttribute("data-theme", initialTheme);

// Use empty string as basename for Netlify deployment
const basename = "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
