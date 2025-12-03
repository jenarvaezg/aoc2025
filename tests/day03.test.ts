import { part1, part2 } from '../solutions/day03';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day03', () => {
  const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
  const realInput = readFileSync(join('inputs', 'day03.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(357);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(3121910778619);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(17087);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(169019504359949);
  });
});
