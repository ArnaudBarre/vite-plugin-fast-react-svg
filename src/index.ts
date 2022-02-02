import { readFileSync } from "fs";
import { transform } from "esbuild";
import { Plugin } from "vite";

export default function svgPlugin(): Plugin {
  return {
    name: "svg",
    enforce: "pre",
    load(id) {
      if (id.endsWith(".svg")) {
        return readFileSync(id, "utf-8");
      }
      if (id.endsWith(".svg?inline")) {
        return readFileSync(id.replace("?inline", ""), "utf-8");
      }
    },
    transform(code, id) {
      if (id.endsWith(".svg")) {
        return transform(svgToJSX(code), { loader: "jsx" });
      }
      if (id.endsWith(".svg?inline")) {
        const base64 = Buffer.from(code).toString("base64");
        return `export default "data:image/svg+xml;base64,${base64}"`;
      }
    },
  };
}

const svgToJSX = (svg: string) =>
  `import React from "react";const ReactComponent = (props) => (${svg
    .replace(/\s([a-z-:]*)="[^"]*"/gu, (string, key: string) => {
      if (key.startsWith("data-")) return string;
      const keyWithoutDashes = camelCaseOn(key, "-");
      const keyWithoutDots = camelCaseOn(keyWithoutDashes, ":");
      return string.replace(key, keyWithoutDots);
    })
    .replace(">", " {...props}>")});export default ReactComponent`;

const camelCaseOn = (string: string, delimiter: string) =>
  string
    .split(delimiter)
    .map((v, i) => (i === 0 ? v : v[0].toUpperCase() + v.slice(1)))
    .join("");
