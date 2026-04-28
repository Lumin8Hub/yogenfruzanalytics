import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const clientDir = "dist/client";
const assetsDir = join(clientDir, "assets");

if (!existsSync(assetsDir)) {
  throw new Error("Missing dist/client/assets. Run vite build first.");
}

const assets = readdirSync(assetsDir);
const main = assets.find((file) => /^main-.*\.js$/.test(file));
const styles = assets.find((file) => /^styles-.*\.css$/.test(file));

if (!main) {
  throw new Error("Could not find the generated client entry in dist/client/assets.");
}

const mainPath = join(assetsDir, main);
const mainJs = readFileSync(mainPath, "utf8");
const staticMainJs = mainJs.replace(
  /([\w$]+)\.hydrateRoot\(document,(.+?)\)\}\);export\{/s,
  '$1.createRoot(document.getElementById("root")).render($2)});export{',
);

if (staticMainJs === mainJs) {
  throw new Error("Could not convert the client entry from hydration to static mounting.");
}

writeFileSync(mainPath, staticMainJs);

const rawBase = process.env.GITHUB_PAGES_BASE || "/";
const base = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
const normalizedBase = base.endsWith("/") ? base : `${base}/`;

const stylesheet = styles
  ? `    <link rel="stylesheet" crossorigin href="${normalizedBase}assets/${styles}" />\n`
  : "";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Community Impact Report 2025-26</title>
    <meta name="description" content="Infographic report website sharing the 2025-26 Community Impact Study findings for Jewish Canada." />
${stylesheet}  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="${normalizedBase}assets/${main}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
writeFileSync(join(clientDir, "404.html"), html);
