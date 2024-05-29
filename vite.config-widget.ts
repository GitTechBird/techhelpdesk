import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import proxyOptions from "./proxyOptions";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";


export default defineConfig({
  define: {
    'process.env.BASE_APP': JSON.stringify(process.env.BASE_APP)
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../one_tap_v1/public/techhelpdesk/widget",
    emptyOutDir: true,
    target: "esnext",
    polyfillDynamicImport: false,
    // minify: 'terser', // Minify JavaScript output
    cssCodeSplit: false, // Disable CSS code splitting
    assetsInlineLimit: 0, // Inline all assets regardless of file size
    rollupOptions: {
      input: {
        app: "src/main.tsx",
      },
      output: {
        entryFileNames: "tech-im.js",
      },
    },
  },
});
