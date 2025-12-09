export function part1(input: string): number {
  const coords = input
    .trim()
    .split('\n')
    .map((line) => line.split(',').map(Number));
  let biggest = 0;

  for (let i = 0; i < coords.length; i++) {
    const coord1 = coords[i]!;
    for (let j = i + 1; j < coords.length; j++) {
      const coord2 = coords[j]!;
      const width = Math.abs(coord1[0]! - coord2[0]!) + 1;
      const height = Math.abs(coord1[1]! - coord2[1]!) + 1;
      const area = width * height;
      if (area > biggest) {
        biggest = area;
      }
    }
  }

  return biggest;
}

type Point = [number, number];
type Edge = { x1: number; y1: number; x2: number; y2: number; vertical: boolean };

const pointOnSegment = ([px, py]: Point, { x1, y1, x2, y2 }: Edge) => {
  const withinX = Math.min(x1, x2) <= px && px <= Math.max(x1, x2);
  const withinY = Math.min(y1, y2) <= py && py <= Math.max(y1, y2);
  const cross = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1);
  return cross === 0 && withinX && withinY;
};

const pointInPolygon = ([px, py]: Point, polygon: Point[]) => {
  let inside = false;
  for (let i = 0; i < polygon.length; i++) {
    const [x1, y1] = polygon[i]!;
    const [x2, y2] = polygon[(i + 1) % polygon.length]!;

    const edge = { x1, y1, x2, y2, vertical: x1 === x2 };
    if (pointOnSegment([px, py], edge)) return true; // boundary counts as inside

    const intersects =
      y1 > py !== y2 > py &&
      px <= ((x2 - x1) * (py - y1)) / (y2 - y1) + x1; // horizontal ray to the right
    if (intersects) inside = !inside;
  }
  return inside;
};

const buildPolygonEdges = (poly: Point[]): Edge[] =>
  poly.map(([x1, y1], i) => {
    const [x2, y2] = poly[(i + 1) % poly.length]!;
    return { x1, y1, x2, y2, vertical: x1 === x2 };
  });

const edgeIntersectionType = (rect: Edge, poly: Edge): 'none' | 'overlap' | 'corner' | 'cross' => {
  const rectVert = rect.vertical;
  const polyVert = poly.vertical;

  if (rectVert === polyVert) {
    if (rectVert) {
      if (rect.x1 !== poly.x1) return 'none';
      const maxStart = Math.max(Math.min(rect.y1, rect.y2), Math.min(poly.y1, poly.y2));
      const minEnd = Math.min(Math.max(rect.y1, rect.y2), Math.max(poly.y1, poly.y2));
      return maxStart <= minEnd ? 'overlap' : 'none';
    } else {
      if (rect.y1 !== poly.y1) return 'none';
      const maxStart = Math.max(Math.min(rect.x1, rect.x2), Math.min(poly.x1, poly.x2));
      const minEnd = Math.min(Math.max(rect.x1, rect.x2), Math.max(poly.x1, poly.x2));
      return maxStart <= minEnd ? 'overlap' : 'none';
    }
  }

  // One vertical, one horizontal
  const vert = rectVert ? rect : poly;
  const horiz = rectVert ? poly : rect;

  const ix = vert.x1;
  const iy = horiz.y1;
  const withinVert = Math.min(vert.y1, vert.y2) <= iy && iy <= Math.max(vert.y1, vert.y2);
  const withinHoriz = Math.min(horiz.x1, horiz.x2) <= ix && ix <= Math.max(horiz.x1, horiz.x2);
  if (!withinVert || !withinHoriz) return 'none';

  const isRectCorner = (ix === rect.x1 && iy === rect.y1) || (ix === rect.x2 && iy === rect.y2);
  const isPolyEndpoint = (ix === poly.x1 && iy === poly.y1) || (ix === poly.x2 && iy === poly.y2);
  return isRectCorner || isPolyEndpoint ? 'corner' : 'cross';
};

const rectangleInside = (p1: Point, p2: Point, polygon: Point[], polygonEdges: Edge[]) => {
  const minX = Math.min(p1[0], p2[0]);
  const maxX = Math.max(p1[0], p2[0]);
  const minY = Math.min(p1[1], p2[1]);
  const maxY = Math.max(p1[1], p2[1]);

  const corners: Point[] = [
    [minX, minY],
    [minX, maxY],
    [maxX, minY],
    [maxX, maxY],
  ];
  if (!corners.every((pt) => pointInPolygon(pt, polygon))) return false;

  const rectEdges: Edge[] = [
    { x1: minX, y1: minY, x2: maxX, y2: minY, vertical: false },
    { x1: maxX, y1: minY, x2: maxX, y2: maxY, vertical: true },
    { x1: maxX, y1: maxY, x2: minX, y2: maxY, vertical: false },
    { x1: minX, y1: maxY, x2: minX, y2: minY, vertical: true },
  ];

  for (const rectEdge of rectEdges) {
    for (const polyEdge of polygonEdges) {
      const type = edgeIntersectionType(rectEdge, polyEdge);
      if (type === 'cross') return false;
    }
  }
  return true;
};

export function part2(input: string): number {
  const red = input
    .trim()
    .split('\n')
    .map((line) => line.split(',').map(Number));

  const polygonEdges = buildPolygonEdges(red);

  let best = 0;
  for (let i = 0; i < red.length; i++) {
    for (let j = i + 1; j < red.length; j++) {
      const p1 = red[i]!;
      const p2 = red[j]!;
      const width = Math.abs(p1[0] - p2[0]) + 1;
      const height = Math.abs(p1[1] - p2[1]) + 1;
      const area = width * height;
      if (area <= best) continue;
      if (rectangleInside(p1, p2, red, polygonEdges)) {
        best = area;
      }
    }
  }

  return best;
}
