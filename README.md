# vite-plugin-fast-react-svg [![npm](https://img.shields.io/npm/v/vite-plugin-fast-react-svg)](https://www.npmjs.com/package/vite-plugin-fast-react-svg)

Turn SVG into React components, without Babel.

⚠️ This plugin expects svg to be cleanup by [svgo](https://github.com/svg/svgo) with `convertStyleToAttrs` enable. You can also use the [web version](https://jakearchibald.github.io/svgomg/) and toggle `Style to attributes`.

## Why

While [svgr](https://github.com/gregberge/svgr) is great, it uses AST transformation from Babel, which is too slow (~300ms per SVG). This plugin uses regex manipulations for SVG -> JSX and esbuild for JSX -> JS (~10ms in average). It's working well for SVG optimized by [svgo](https://github.com/svg/svgo).

## Installation

```sh
npm i -D vite-plugin-fast-react-svg
```

In your vite config:

```ts
import { defineConfig } from "vite";
import { svgPlugin } from "vite-plugin-fast-react-svg";

export default defineConfig({
  plugins: [svgPlugin({ useInnerHTML: true })],
});
```

In `tsconfig.json`:

```json5
{
  compilerOptions: {
    types: ["vite-plugin-fast-react-svg/types", "vite/client"],
  },
}
```

## Usage

```jsx
import Logo from "./logo.svg";
import base64Data from "./logo.svg?inline";

const Example = () => (
  <>
    <Logo />
    <img src={base64Data} alt="Logo" />
  </>
);
```

## Options

**useInnerHTML**: Set to true to use `dangerouslySetInnerHTML` for SVG contents, which improve bundle size. Added in 0.3.0.
