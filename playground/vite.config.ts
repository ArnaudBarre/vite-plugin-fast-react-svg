import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { svgPlugin } from "../src/index.ts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgPlugin() as Plugin],
});
