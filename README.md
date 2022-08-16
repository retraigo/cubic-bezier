# CubicBezier
Generate a curve with a cubic-bezier in TypeScript.

## Usage

```ts
import CubicBezier from "https://deno.land/x/cubicbezier@v0.0.1/mod.ts"

import CubicBezier from "./mod.ts"

const bezier = new CubicBezier(.5,.7,.19,.96);

console.log(bezier.renderAsCanvas(800).toDataURL())
```

## License
MIT as always.