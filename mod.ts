import * as Canvas from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const POINT_0 = [0, 0];
const POINT_3 = [1, 1];

export default class CubicBezier {
  coordinates: [number, number, number, number];
  constructor(
    ...coordinates: [number, number, number, number]
  ) {
    this.coordinates = coordinates;
  }
  getPoints() {
    const curve: [number, number][] = [];
    let t = 0;
    while (t <= 1) {
      const x = Math.pow(1 - t, 3) * POINT_0[0] +
        3 * Math.pow(1 - t, 2) * t * this.coordinates[0] +
        3 * (1 - t) * Math.pow(t, 2) * this.coordinates[2] +
        Math.pow(t, 3) * POINT_3[0];
      const y = Math.pow(1 - t, 3) * POINT_0[1] +
        3 * Math.pow(1 - t, 2) * t * this.coordinates[1] +
        3 * (1 - t) * Math.pow(t, 2) * this.coordinates[3] +
        Math.pow(t, 3) * POINT_3[0];
      curve.push([x, y]);
      t += 0.01;
    }
    return curve;
  }
  renderAsCanvas(size=300): Canvas.EmulatedCanvas2D {
    const points = this.getPoints();

    const canvas = Canvas.createCanvas(size, size);

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();

    ctx.moveTo(0, size);

    for (const point of points) {
      ctx.lineTo(point[0] * size, size - (point[1] * size));
    }
    ctx.stroke();
    ctx.closePath();
    return canvas;
  }
}
