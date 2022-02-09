import { readFileSync } from "fs";
import { transform } from "esbuild";
import { Plugin } from "vite";

export default function svgPlugin(): Plugin {
  return {
    name: "svg",
    enforce: "pre",
    async load(id) {
      if (id.endsWith(".svg")) {
        const { code, warnings } = await transform(
          svgToJSX(readFileSync(id, "utf-8")),
          { loader: "jsx" }
        );
        for (const warning of warnings) {
          console.log(warning.location, warning.text);
        }
        return code;
      }
      if (id.endsWith(".svg?inline")) {
        const base64 = Buffer.from(
          readFileSync(id.replace("?inline", ""), "utf-8")
        ).toString("base64");
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
