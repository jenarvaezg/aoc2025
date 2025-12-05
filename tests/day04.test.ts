import { part1, part2 } from '../solutions/day04';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day04', () => {
  const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
  const realInput = readFileSync(join('inputs', 'day04.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(13);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(43);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(1435);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(8623);
  });
});
