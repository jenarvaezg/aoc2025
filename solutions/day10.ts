interface Line {
  target: number;
  lights: number;
  buttons: number[];
}

export function part1(input: string): number {
  const lines: Line[] = input
    .trim()
    .split('\n')
    .map((line) => {
      const diagram = line.match(/\[(.*)\]/)![1]!;
      const lights = diagram.length;
      let target = 0;
      for (let i = 0; i < lights; i++) {
        if (diagram[i] === '#') {
          target |= 1 << i; // bit 0 corresponds to light 0 (leftmost)
        }
      }
      const buttons = [...line.matchAll(/\((\d+(?:,\d+)*)\)/g)].map((match) =>
        match[1]!
          .split(',')
          .map((n) => 1 << parseInt(n))
          .reduce((a, c) => a + c, 0)
      );
      return { target, buttons, lights };
    });

  const minPresses = ({ target, buttons, lights }: Line) => {
    if (target === 0) return 0;
    const maxStates = 1 << lights;
    const dist = new Int32Array(maxStates).fill(-1);
    const queue: number[] = [];
    dist[0] = 0;
    queue.push(0);

    for (let qi = 0; qi < queue.length; qi++) {
      const state = queue[qi]!;
      const d = dist[state]!;
      for (const btn of buttons) {
        const next = state ^ btn;
        if (dist[next] !== -1) continue;
        const nd = d + 1;
        if (next === target) return nd;
        dist[next] = nd;
        queue.push(next);
      }
    }
    return Infinity;
  };

  return lines.reduce((acc, line) => acc + minPresses(line), 0);
}

export function part2(input: string): number {
  return 0;
}
