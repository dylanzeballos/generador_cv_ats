import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          templates: [
            "./src/templates/ATS/ATS.tsx",
            "./src/templates/Harvard/Harvard.tsx",
          ],
        },
      },
    },
  },
});
