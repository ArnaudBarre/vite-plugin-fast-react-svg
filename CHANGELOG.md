# Changelog

## 0.3.1

Forward ref to svg element

## 0.3.0

Added `useInnerHTML` option to use `dangerouslySetInnerHTML` for SVG contents which improve bundle size.

## 0.2.0

Breaking: Use named export instead of default export for better esm/cjs interop. Closes #2

To migrate, replace your import by `import { svgPlugin } from "vite-plugin-fast-react-svg";`

## 0.1.4

Add vite@3 to peer dependency range

## 0.1.3

Expose svgToJSX for reuse in other build pipelines

## 0.1.2

Use only `load` to skip source maps

## 0.1.1

Fix build issue with empty source maps

## 0.1.0

Initial release
