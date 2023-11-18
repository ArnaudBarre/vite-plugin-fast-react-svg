import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactLogo from "./react.svg";
import ViteLogo from "./vite.svg";
import reactLogoSrc from "./react.svg?inline";
import viteLogoSrc from "./vite.svg?inline";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <img src={reactLogoSrc} />
    <img src={viteLogoSrc} />
    <ReactLogo />
    <ViteLogo />
  </StrictMode>,
);
