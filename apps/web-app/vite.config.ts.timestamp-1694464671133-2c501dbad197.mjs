// vite.config.ts
import react from "file:///home/jes/.projects/CulinaryAlchemy/node_modules/.pnpm/@vitejs+plugin-react-swc@3.3.2_vite@4.4.9/node_modules/@vitejs/plugin-react-swc/index.mjs";
import million from "file:///home/jes/.projects/CulinaryAlchemy/node_modules/.pnpm/million@2.5.4-beta.2/node_modules/million/dist/compiler.mjs";
import path from "path";
import { defineConfig } from "file:///home/jes/.projects/CulinaryAlchemy/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.7/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/home/jes/.projects/CulinaryAlchemy/apps/web-app";
var vite_config_default = defineConfig({
  plugins: [million.vite({ auto: true, mute: true }), react()],
  resolve: {
    alias: {
      "@mui/material": "@mui/joy",
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qZXMvLnByb2plY3RzL0N1bGluYXJ5QWxjaGVteS9hcHBzL3dlYi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2plcy8ucHJvamVjdHMvQ3VsaW5hcnlBbGNoZW15L2FwcHMvd2ViLWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9qZXMvLnByb2plY3RzL0N1bGluYXJ5QWxjaGVteS9hcHBzL3dlYi1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW21pbGxpb24udml0ZSh7IGF1dG86IHRydWUsIG11dGU6IHRydWV9KSwgcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0BtdWkvbWF0ZXJpYWwnOiAnQG11aS9qb3knLFxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLE9BQU8sV0FBVztBQUNwVixPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBSDdCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxRQUFRLEtBQUssRUFBRSxNQUFNLE1BQU0sTUFBTSxLQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7QUFBQSxFQUMxRCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxpQkFBaUI7QUFBQSxNQUNqQixLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
