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

  let html = await res.text();

  const publicDir = path.resolve(projectRoot, ".output/public");
  const distDir = path.resolve(projectRoot, "dist");
  const publicAssetsDir = path.join(publicDir, "assets");

  if (!fs.existsSync(publicAssetsDir)) {
    throw new Error(`[prerender] Assets directory not found at: ${publicAssetsDir}`);
  }

  const diskCssFiles = fs.readdirSync(publicAssetsDir).filter((f) => f.endsWith(".css"));
  const diskJsFiles = fs.readdirSync(publicAssetsDir).filter((f) => f.endsWith(".js"));

  console.log("[prerender] CSS files on disk:", diskCssFiles);
  console.log("[prerender] JS files on disk:", diskJsFiles);

  // Validate and auto-reconcile CSS links in HTML with actual files on disk
  const cssMatches = [...html.matchAll(/href=["'](\/assets\/[^"']+\.css)["']/g)];
  for (const match of cssMatches) {
    const cssPath = match[1];
    const filename = path.basename(cssPath);
    if (!diskCssFiles.includes(filename)) {
      console.warn(`[prerender] Stale CSS link detected: ${cssPath}`);
      // Find matching styles-*.css on disk
      const actualCss = diskCssFiles.find((f) => f.startsWith("styles-"));
      if (actualCss) {
        console.log(`[prerender] Reconciling CSS link: replacing ${filename} with ${actualCss}`);
        html = html.replaceAll(cssPath, `/assets/${actualCss}`);
      }
    } else {
      console.log(`[prerender] Verified CSS link: ${cssPath} exists on disk.`);
    }
  }

  // Validate and auto-reconcile JS links in HTML with actual files on disk
  const jsMatches = [...html.matchAll(/(?:href|src)=["'](\/assets\/[^"']+\.js)["']/g)];
  for (const match of jsMatches) {
    const jsPath = match[1];
    const filename = path.basename(jsPath);
    if (!diskJsFiles.includes(filename)) {
      console.warn(`[prerender] Stale JS link detected: ${jsPath}`);
      const prefix = filename.split("-")[0];
      const actualJs = diskJsFiles.find((f) => f.startsWith(prefix + "-"));
      if (actualJs) {
        console.log(`[prerender] Reconciling JS link: replacing ${filename} with ${actualJs}`);
        html = html.replaceAll(jsPath, `/assets/${actualJs}`);
      }
    } else {
      console.log(`[prerender] Verified JS link: ${jsPath} exists on disk.`);
    }
  }

  // Ensure publicDir exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write to .output/public
  fs.writeFileSync(path.join(publicDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, "404.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, ".nojekyll"), "", "utf-8");

  // Recreate dist
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(publicDir, distDir, { recursive: true });

  // Verify dist/index.html has valid assets
  const distHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  const distCss = [...distHtml.matchAll(/href=["'](\/assets\/[^"']+\.css)["']/g)].map((m) => m[1]);
  for (const c of distCss) {
    const p = path.join(distDir, c);
    if (!fs.existsSync(p)) {
      throw new Error(`[prerender] FATAL: Dist CSS file does not exist: ${p}`);
    }
  }

  console.log(
    `[prerender] SUCCESS! Pre-rendered complete static site to .output/public and dist/ (${html.length} bytes)`,
  );
}

prerender().catch((err) => {
  console.error("[prerender] Error:", err);
  process.exit(1);
});
