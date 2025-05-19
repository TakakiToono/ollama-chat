import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // server: {
  //   host: "::",
  //   port: 8080,
  //   proxy: {
  //     "/api": {
  //       target: "https://899f-2409-40d0-2016-69a-2daf-e0c2-bae7-ab75.ngrok-free.app",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //       secure: false,
  //       headers: {
  //         'Origin': 'http://localhost:8080'
  //       },
  //     },
  //   },
  // },
  server: {
    proxy: {
      "/chat": "https://poetic-uniformly-jackal.ngrok-free.app",
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
