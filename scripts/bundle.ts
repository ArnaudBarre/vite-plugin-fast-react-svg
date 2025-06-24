#!/usr/bin/env tnode
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

import packageJSON from "../package.json";

rmSync("dist", { force: true, recursive: true });

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  format: "esm",
  platform: "node",
  target: "node20",
  legalComments: "inline",
  external: Object.keys(packageJSON.peerDependencies),
}).then(() => {
  execSync("cp LICENSE README.md types.d.ts dist/");

  writeFileSync(
    "dist/index.d.ts",
    `import { Plugin } from "vite";
export declare function svgPlugin(): Plugin;
export declare const svgToJS: (svg: string, production: boolean) => string;
`,
  );

  writeFileSync(
    "dist/package.json",
    JSON.stringify(
      {
        name: packageJSON.name,
        description: "Turn SVG into React components, without Babel",
        version: packageJSON.version,
        author: "Arnaud Barré (https://github.com/ArnaudBarre)",
        license: packageJSON.license,
        repository: "github:ArnaudBarre/vite-plugin-fast-react-svg",
        type: "module",
        exports: {
          ".": "./index.js",
          "./types": { types: "./types.d.ts" },
        },
        keywords: ["vite", "vite-plugin", "react", "svg"],
        peerDependencies: packageJSON.peerDependencies,
      },
      null,
      2,
    ),
  );
});
