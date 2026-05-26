import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isGHPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGHPages ? "/portfolio/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
