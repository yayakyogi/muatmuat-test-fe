import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "rsuite/dist/rsuite.min.css";
import App from "@App";
import "virtual:uno.css";
import { Provider as JotaiProvider } from "jotai";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JotaiProvider>
  </StrictMode>
);
