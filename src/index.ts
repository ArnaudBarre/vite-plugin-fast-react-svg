import { readFileSync } from "fs";
import { transform } from "esbuild";
import { Plugin } from "vite";

export function svgPlugin(opts?: { useInnerHTML?: boolean }): Plugin {
  return {
    name: "svg",
    enforce: "pre",
    async load(id) {
      if (id.endsWith(".svg")) {
        const { code, warnings } = await transform(
          svgToJSX(readFileSync(id, "utf-8"), opts?.useInnerHTML),
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

export const svgToJSX = (svg: string, useInnerHTML?: boolean) => {
  let jsx: string;
  if (useInnerHTML) {
    const index = svg.indexOf(">");
    const content = svg
      .slice(index + 1, svg.indexOf("</svg>"))
      .trim()
      .replace(/\s+/g, " ");
    jsx = `${updatePropsCase(
      svg.slice(0, index)
    )} ref={ref} {...props} dangerouslySetInnerHTML={{ __html: '${content}' }} />`;
  } else {
    jsx = updatePropsCase(svg).replace(">", " ref={ref} {...props}>");
  }
  return `import React from "react";const ReactComponent = React.forwardRef((props, ref) => (${jsx}));export default ReactComponent;`;
};

const updatePropsCase = (svg: string) =>
  svg.replace(/\s([a-z-:]*)="[^"]*"/gu, (string, key: string) => {
    if (key.startsWith("data-")) return string;
    const keyWithoutDashes = camelCaseOn(key, "-");
    const keyWithoutDots = camelCaseOn(keyWithoutDashes, ":");
    return string.replace(key, keyWithoutDots);
  });

const camelCaseOn = (string: string, delimiter: string) =>
  string
    .split(delimiter)
    .map((v, i) => (i === 0 ? v : v[0].toUpperCase() + v.slice(1)))
    .join("");
