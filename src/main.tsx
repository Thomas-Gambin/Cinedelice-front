import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "@styles/reset.css";
import "@styles/index.scss";
import App from "./App";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
