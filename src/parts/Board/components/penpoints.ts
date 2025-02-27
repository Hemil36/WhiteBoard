import { LayerType } from "@/types/canvas";

export function penPointsToPathLayer(
    points: number[][],
    color: Color,
  ): PathLayer {
    if (points.length < 2) {
      throw new Error("Cannot transform points with less than 2 points");
    }
  
    let left = Number.POSITIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let right = Number.NEGATIVE_INFINITY;
    let bottom = Number.NEGATIVE_INFINITY;
  
    for (const point of points) {
      const [x, y] = point;
  
      if (left > x) {
        left = x;
      }
  
      if (top > y) {
        top = y;
      }
  
      if (right < x) {
        right = x;
      }
  
      if (bottom < y) {
        bottom = y;
      }
    }
  
    return {
      type: LayerType.Path,
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      fill: color,
      points: points
        .map(([x, y, pressure]) => [x - left, y - top, pressure]),
    };
  };
  
  export function getSvgPathFromStroke(stroke: number[][]) {
    if (!stroke.length) return "";
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );
  
    d.push("Z");
    return d.join(" ");
  };