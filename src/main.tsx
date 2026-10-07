import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./hooks/useLanguage";
import "./index.css";
import ClickSpark from "./components/ui/ClickSpark";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <ClickSpark
        sparkColor="#d7ff3f"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <App />
      </ClickSpark>
    </LanguageProvider>
  </StrictMode>,
);
