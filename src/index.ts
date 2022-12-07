import { readFileSync } from "fs";
import { Plugin } from "vite";

export function svgPlugin(): Plugin {
  let production = false;
  return {
    name: "svg",
    enforce: "pre",
    config(_, env) {
      production = env.command === "build";
    },
    async load(id) {
      if (id.endsWith(".svg")) {
        return svgToJS(readFileSync(id, "utf-8"), production);
      }
      if (id.endsWith(".svg?inline")) {
        const base64 = Buffer.from(
          readFileSync(id.replace("?inline", ""), "utf-8"),
        ).toString("base64");
        return `export default "data:image/svg+xml;base64,${base64}"`;
      }
    },
  };
}

const attributesRE = /\s([a-zA-Z0-9-:]+)=("[^"]*")/gu;

export const svgToJS = (svg: string, production: boolean) => {
  const index = svg.indexOf(">");
  const content = svg
    .slice(index + 1, svg.indexOf("</svg>"))
    .trim()
    .replace(/\s+/g, " ");
  let attributes = "";
  for (const match of svg.slice(0, index).matchAll(attributesRE)) {
    attributes += `    ${transformKey(match[1])}: ${match[2]},\n`;
  }
  const jsxImport = production
    ? 'import { jsx } from "react/jsx-runtime";'
    : 'import { jsxDEV as jsx } from "react/jsx-dev-runtime";';
  return `${jsxImport}
import { forwardRef } from "react";
export default forwardRef((props, ref) => jsx("svg", {
${attributes}    ref,
    ...props,
    dangerouslySetInnerHTML: { __html: '${content}' }
  })
);`;
};

const transformKey = (key: string) => {
  if (key.startsWith("data-")) return `"${key}"`;
  const keyWithoutDashes = camelCaseOn(key, "-");
  return camelCaseOn(keyWithoutDashes, ":");
};

const camelCaseOn = (string: string, delimiter: string) =>
  string
    .split(delimiter)
    .map((v, i) => (i === 0 ? v : v[0].toUpperCase() + v.slice(1)))
    .join("");
