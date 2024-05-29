import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import proxyOptions from "./proxyOptions";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.BASE_APP': JSON.stringify(process.env.BASE_APP)
  },
  plugins: [react()],
  server: {
    port: 8080,
    proxy: proxyOptions,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../one_tap_v1/public/techhelpdesk",
    emptyOutDir: true,
    target: "es2015",
  }
});
