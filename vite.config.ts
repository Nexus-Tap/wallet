import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from 'fs';

export default defineConfig({
  logLevel: 'info',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Optional: Can specify '0.0.0.0' to access from any device on the network
    port: 3000, // Optional: You can choose a different port if needed
  },
  define: {
    'global': {},
  },
});
