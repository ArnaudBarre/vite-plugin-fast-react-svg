# vite-plugin-fast-react-svg [![npm](https://img.shields.io/npm/v/vite-plugin-fast-react-svg)](https://www.npmjs.com/package/vite-plugin-fast-react-svg)

Turn SVG into React components, without Babel.

⚠️ This plugin expects svg to be cleanup by [svgo](https://github.com/svg/svgo) with `convertStyleToAttrs` enable. You can also use the [web version](https://jakearchibald.github.io/svgomg/) and toggle `Style to attributes`.

## Why

While [svgr](https://github.com/gregberge/svgr) is great, it uses AST transformation from Babel, which is too slow (~300ms per SVG). This plugin uses regex manipulations and `dangerouslySetInnerHTML`, which is almost instantaneous. It's working well for SVG optimized by [svgo](https://github.com/svg/svgo).

## Installation

```sh
npm i -D vite-plugin-fast-react-svg
```

In your vite config:

```ts
import { defineConfig } from "vite";
import { svgPlugin } from "vite-plugin-fast-react-svg";

export default defineConfig({
  plugins: [svgPlugin()],
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

If you use a custom `.d.ts` file instead of `tsconfig.json` to include Vite Client Types, you will need to modify it accordingly:

```
/// <reference types="vite-plugin-fast-react-svg/types" />
/// <reference types="vite/client" />
```

> N.B: You only need to include Vite Client Types via `tsconfig.json` _or_ a custom `d.ts` file. Both are not needed, so if you have included the types in `tsconfig.json` you can safely delete your `.d.ts` file.

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
