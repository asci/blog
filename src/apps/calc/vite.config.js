import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // This makes all assets use relative paths
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
