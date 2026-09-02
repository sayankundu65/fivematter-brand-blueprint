import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function staticExportPlugin() {
  return {
    name: "static-export",
    apply: "build" as const,
    async closeBundle() {
      try {
        const ssrEntryPath = path.resolve(
          __dirname,
          "node_modules/.nitro/vite/services/ssr/index.js",
        );
        if (fs.existsSync(ssrEntryPath)) {
          const { default: server } = await import(`file://${ssrEntryPath.replace(/\\/g, "/")}`);
          if (server && typeof server.fetch === "function") {
            const res = await server.fetch(new Request("http://localhost/"));
            if (res.status === 200) {
              const html = await res.text();
              const publicDir = path.resolve(__dirname, ".output/public");
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              fs.writeFileSync(path.join(publicDir, "index.html"), html, "utf-8");
              fs.writeFileSync(path.join(publicDir, "404.html"), html, "utf-8");
              fs.writeFileSync(path.join(publicDir, ".nojekyll"), "", "utf-8");

              const distDir = path.resolve(__dirname, "dist");
              if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
              }
              fs.cpSync(publicDir, distDir, { recursive: true });

              console.log(
                "\n[static-export] Generated static files in .output/public and dist (index.html, 404.html, .nojekyll)",
              );
            }
          }
        }
      } catch (err) {
        console.warn("[static-export] Warning during static export:", err);
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    port: 8080,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
    ...(command === "build"
      ? [
          nitro({
            preset: "cloudflare-module",
          }),
          staticExportPlugin(),
        ]
      : []),
  ],
}));
