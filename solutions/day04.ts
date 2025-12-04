const neighborsDeltas = [
  [0, -1], // up
  [0, 1], // down
  [-1, 0], // left
  [1, 0], //right
  [-1, -1], // upleft
  [1, -1], //upright
  [-1, 1], // downleft
  [1, 1], //downright
];

function reachebleCoords(grid: string[][]): number[][] {
  const height = grid.length;
  const width = grid[0]!.length;

  let result = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y]![x];
      if (cell == '.') {
        continue;
      }
      // Check neighbors
      const neighborCount = neighborsDeltas
        .map(([dx, dy]) => [x + dx!, y + dy!] as const)
        .filter(([nx, ny]) => grid[ny]?.[nx] === '@').length;

      if (neighborCount < 4) {
        result.push([x, y]);
      }
    }
  }
  return result;
}

export function part1(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));

  return reachebleCoords(grid).length;
}

export function part2(input: string): number {
  let grid = input.split('\n').map((line) => line.split(''));

  let clearedTotal = 0;
  while (true) {
    const coords = reachebleCoords(grid);
    if (coords.length === 0) {
      break;
    }

    clearedTotal += coords.length;
    const clearedGrid = grid.map((row) => [...row]);
    coords.forEach(([x, y]) => {
      clearedGrid[y]![x] = '.';
    });
    grid = clearedGrid;
  }

  return clearedTotal;
}
