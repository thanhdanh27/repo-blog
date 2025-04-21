import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./components/GlobalStyle/index.jsx";
import { AvatarProvider } from "./AvatarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle>
      <AvatarProvider>
        <App />
      </AvatarProvider>
    </GlobalStyle>
  </StrictMode>
);
