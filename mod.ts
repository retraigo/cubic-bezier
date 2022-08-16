import * as Canvas from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const POINT_0 = [0, 0];
const POINT_3 = [1, 1];

/**
 * A Cubic Bezier
 * Cubic bezier is a curve defined by four points P0, P1, P2, P3.
 * The curve begins at P0 and ends at P3.
 * P1 and P2 define directions in which the curve travels.
 * The constructor only accepts P1 and P2. P0 and P3 are assumed to be `0, 0` and `1, 1`.
 */

export default class CubicBezier {
  coordinates: [number, number, number, number];
  /**
   * Create a new cubic bezier curve.
   * @param coordinates Coordinates in the order p1.x, p1.y, p2.x, p2.y.
   */
  constructor(
    ...coordinates: [number, number, number, number]
  ) {
    this.coordinates = coordinates;
  }
  /**
   * Get an array of points in the curve.
   * @returns Array of 100 points with [x, y].
   */
  getPoints(): [number, number][] {
    const curve: [number, number][] = [];
    let t = 0;
    do {
      curve.push([
        Math.pow(1 - t, 3) * POINT_0[0] +
        3 * Math.pow(1 - t, 2) * t * this.coordinates[0] +
        3 * (1 - t) * Math.pow(t, 2) * this.coordinates[2] +
        Math.pow(t, 3) * POINT_3[0],

        Math.pow(1 - t, 3) * POINT_0[1] +
        3 * Math.pow(1 - t, 2) * t * this.coordinates[1] +
        3 * (1 - t) * Math.pow(t, 2) * this.coordinates[3] +
        Math.pow(t, 3) * POINT_3[1],
      ]);
      t += 0.01;
    } while (t <= 1);
    return curve;
  }
  /**
   * Render the curve on a canvas.
   * @param size Size of the canvas in pixels.
   * @returns Canvas generated.
   */
  renderAsCanvas(size = 300): Canvas.EmulatedCanvas2D {
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
