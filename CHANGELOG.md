# Changelog

## 0.5.2

- Add vite@7 to peer dependency ranges

## 0.5.1

- Vite 6 as a peer deps

## 0.5.0

- Drop support for `?inline`, this now supported into core in v5
- ESM only, requires node 18
- Vite 5 as a peer deps

## 0.4.0

Turn SVG into React components, even faster.

This new version uses only regex and dangerouslySetInnerHTML to directly create a JS output.

Breaking changes:

- No more options available
- Expose the new `svgToJS` function instead of the previous `svgToJSX`

Compatible with Vite 4.

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
