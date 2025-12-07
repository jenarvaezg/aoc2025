interface Coord {
  x: number;
  y: number;
}

export function part1(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));
  const startCoord = { x: grid[0]?.indexOf('S')!, y: 0 };
  let splitCount = 0;
  let rays: Coord[][] = [[startCoord]];

  for (let y = 1; y < grid.length; y++) {
    const raysAbove = rays[y - 1]!;
    const currentRays: Coord[] = [];
    const seen = new Set<string>();
    const pushRay = (coord: Coord) => {
      const key = `${coord.x},${coord.y}`;
      if (seen.has(key)) return;
      seen.add(key);
      currentRays.push(coord);
    };
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

  for (let y = 1; y < grid.length; y++) {
    const prev = timelines[y - 1]!;
    const current = new Map<number, number>();
    const addCount = (x: number, count: number) => {
      current.set(x, (current.get(x) ?? 0) + count);
    };
    for (const [x, count] of prev.entries()) {
      if (grid[y]![x] === '.') {
        addCount(x, count);
      } else {
        addCount(x - 1, count);
        addCount(x + 1, count);
      }
    }
    timelines.push(current);
  }

  return timelines[timelines.length - 1]!.values().reduce((a, c) => a + c, 0);
}
