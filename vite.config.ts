import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: './', // 👈 1. Add this to make paths relative
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
    hmr: {
      clientPort: 443, // 👈 2. Add this so HMR works over HTTPS tunnel
      overlay: false,
    },
  },
  // 3. Add a preview block to ensure it stays on 8080
  preview: {
    port: 8080,
    allowedHosts: true,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));