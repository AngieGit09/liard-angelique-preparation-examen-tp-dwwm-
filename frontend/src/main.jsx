// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Librairies
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Styles du projet (centralisés)
import "./styles/index.css";

// App
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
