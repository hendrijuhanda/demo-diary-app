import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),

      laravel({
        input: ["resources/css/app.css", "resources/js/app.js"],
        refresh: true,
      }),
    ],

    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(
            new URL("./resources/react", import.meta.url)
          ),
        },
        { find: "@mui/material", replacement: "@mui/joy" },
      ],
    },

    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_HMR_PORT),
      hmr: {
        host: "localhost",
      },
    },
  };
});
