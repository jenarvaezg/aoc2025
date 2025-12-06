import { part1, part2 } from '../solutions/day06';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day06', () => {
  const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
  const realInput = readFileSync(join('inputs', 'day06.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(4277556);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(3263827);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(4412382293768);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(7858808482092);
  });
});
