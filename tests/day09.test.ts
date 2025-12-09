import { part1, part2 } from '../solutions/day09';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day09', () => {
  const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
  const realInput = readFileSync(join('inputs', 'day09.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(50);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(24);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(4748826374);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(1554370486);
  });
});
