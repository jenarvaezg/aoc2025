import { part1, part2 } from '../solutions/day10';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day10', () => {
  const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;
  const realInput = readFileSync(join('inputs', 'day10.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(7);
  });

  // test('part2 - example', () => {
  //   expect(part2(exampleInput)).toBe(24);
  // });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(409);
  });

  // test('part2 - real input', () => {
  //   expect(part2(realInput)).toBe(1554370486);
  // });
});
