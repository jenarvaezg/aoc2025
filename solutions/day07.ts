interface Coord {
  x: number;
  y: number;
}

const addRay = (seen: Set<string>, rays: Coord[], lineLength: number) => (coord: Coord) => {
  if (coord.x < 0 || coord.x >= lineLength) return; // outside grid
  const key = `${coord.x},${coord.y}`;
  if (seen.has(key)) return;
  seen.add(key);
  rays.push(coord);
};

export function part1(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));
  const startCoord = { x: grid[0]?.indexOf('S')!, y: 0 };
  let splitCount = 0;
  // Keep rays per row, deduping by x,y so the same ray is not processed twice
  let rays: Coord[][] = [[startCoord]];

  for (let y = 1; y < grid.length; y++) {
    const raysAbove = rays[y - 1]!;
    const currentRays: Coord[] = [];
    const seen = new Set<string>();
    const pushRay = addRay(seen, currentRays, grid[y]!.length);
    const currentLine = grid[y]!;

    for (const rayAbove of raysAbove) {
      const currentCoord: Coord = { x: rayAbove.x, y };
      if (currentLine[currentCoord.x] == '.') {
        pushRay({ x: currentCoord.x, y });
      } else {
        splitCount++;
        pushRay({ x: currentCoord.x - 1, y });
        pushRay({ x: currentCoord.x + 1, y });
      }
    }

    rays.push(currentRays);
  }
  return splitCount;
}

export function part2(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));
  const startX = grid[0]?.indexOf('S') ?? -1;
  if (startX < 0) return 0;

  // timelines[y] is a map of x -> number of timelines reaching (x, y)
  let timelines: Map<number, number>[] = [new Map([[startX, 1]])];

  const addCount = (
    map: Map<number, number>,
    x: number,
    y: number,
    count: number,
    lineLength: number
  ) => {
    if (x < 0 || x >= lineLength) return;
    map.set(x, (map.get(x) ?? 0) + count);
  };

  for (let y = 1; y < grid.length; y++) {
    const prev = timelines[y - 1]!;
    const current = new Map<number, number>();
    const lineLength = grid[y]!.length;
    for (const [x, count] of prev.entries()) {
      if (grid[y]![x] === '.') {
        addCount(current, x, y, count, lineLength);
      } else {
        // Split timelines to left and right
        addCount(current, x - 1, y, count, lineLength);
        addCount(current, x + 1, y, count, lineLength);
      }
    }
    timelines.push(current);
  }

  // Total active timelines once we finish traversing the grid
  const lastRow = timelines[timelines.length - 1]!;
  let total = 0;
  for (const count of lastRow.values()) total += count;
  return total;
}
