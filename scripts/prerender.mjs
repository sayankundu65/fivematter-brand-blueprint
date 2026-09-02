import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function prerender() {
  const ssrEntryPath = path.resolve(projectRoot, "node_modules/.nitro/vite/services/ssr/index.js");

  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`SSR entry point not found at: ${ssrEntryPath}. Run vite build first.`);
  }

  console.log("[prerender] Loading SSR entry bundle...");
  const { default: server } = await import(pathToFileURL(ssrEntryPath).href);

  if (!server || typeof server.fetch !== "function") {
    throw new Error("[prerender] Invalid SSR entry: server.fetch is not a function.");
  }

  console.log("[prerender] Fetching root SSR route (http://localhost/)...");
  const res = await server.fetch(new Request("http://localhost/"));
  if (res.status !== 200) {
    throw new Error(`[prerender] Server returned status ${res.status} when fetching root page.`);
  }

  const html = await res.text();

  const publicDir = path.resolve(projectRoot, ".output/public");
  const distDir = path.resolve(projectRoot, "dist");

  // Validate that referenced CSS files actually exist in output
  const cssMatches = [...html.matchAll(/href=["'](\/assets\/[^"']+\.css)["']/g)];
  if (cssMatches.length === 0) {
    console.warn("[prerender] Warning: No CSS stylesheets found in rendered HTML.");
  } else {
    for (const match of cssMatches) {
      const cssPath = match[1];
      const localFile = path.join(publicDir, cssPath);
      if (!fs.existsSync(localFile)) {
        throw new Error(
          `[prerender] CRITICAL: Referenced CSS file does not exist on disk: ${localFile}`,
        );
      }
      console.log(
        `[prerender] Verified CSS link: ${cssPath} (exists on disk, size: ${fs.statSync(localFile).size} bytes)`,
      );
    }
  }

  // Ensure directories exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Clean stale dist files
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });

  // Copy entire public output to dist
  fs.cpSync(publicDir, distDir, { recursive: true });

  // Write index.html, 404.html, and .nojekyll to both .output/public and dist
  fs.writeFileSync(path.join(publicDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, "404.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, ".nojekyll"), "", "utf-8");

  fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(distDir, "404.html"), html, "utf-8");
  fs.writeFileSync(path.join(distDir, ".nojekyll"), "", "utf-8");

  console.log(
    `[prerender] Success! Generated index.html (${html.length} bytes), 404.html, and .nojekyll in .output/public and dist/`,
  );
}

prerender().catch((err) => {
  console.error("[prerender] Error:", err);
  process.exit(1);
});
