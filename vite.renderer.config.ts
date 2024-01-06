import { defineConfig } from 'vite';
import million from "million/compiler";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr"
// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    million.vite({}),
    react(),
    svgr()
  ],
  build: {
    rollupOptions: {
      external: [
        "sharp"
      ]
    }
  }
});
