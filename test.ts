import CubicBezier from "./mod.ts"

const bezier = new CubicBezier(.5,.7,.19,.96);

console.log(bezier.renderAsCanvas(800).toDataURL())