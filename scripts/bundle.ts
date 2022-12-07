#!/usr/bin/env tnode
import { rmSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { build } from "esbuild";

import * as packageJSON from "../package.json";

rmSync("dist", { force: true, recursive: true });

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  platform: "node",
  target: "node14",
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
        main: "index.js",
        keywords: ["vite", "vite-plugin", "react", "svg"],
        peerDependencies: packageJSON.peerDependencies,
      },
      null,
      2,
    ),
  );
});
