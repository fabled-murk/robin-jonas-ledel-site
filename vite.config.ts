import { defineConfig } from "vite";
import { resolve } from "node:path";

// Project pages live under /<repo>/ — override with BASE_PATH for a custom domain.
const base = process.env.BASE_PATH ?? "/robin-jonas-ledel-site/";

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        styleguide: resolve(__dirname, "styleguide.html"),
      },
    },
  },
});
