import { part1, part2 } from '../solutions/day01';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day01', () => {
  const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
  const realInput = readFileSync(join('inputs', 'day01.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(3);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(6);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(1195);
  });
  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(6770);
  });
});
