import { part1, part2 } from '../solutions/day05';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day05', () => {
  const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
  const realInput = readFileSync(join('inputs', 'day05.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(3);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(14);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(661);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(8623);
  });
});
