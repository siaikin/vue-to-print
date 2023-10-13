import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "index",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [
        "vue",
        // https://github.com/vueuse/vue-demi/issues/152#issuecomment-1175681274
        "vue-demi"
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      // https://github.com/vueuse/vue-demi#usage
      "vue-demi"
    ]
  }
});
