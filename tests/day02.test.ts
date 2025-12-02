import { part1, part2 } from '../solutions/day02';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day02', () => {
  const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
  const realInput = readFileSync(join('inputs', 'day02.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput)).toBe(1227775554);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(4174379265);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(40055209690);
  });
  // test('part2 - real input', () => {
  //   expect(part2(realInput)).toBe(6770);
  // });
});
